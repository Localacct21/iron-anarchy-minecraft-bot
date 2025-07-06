#!/usr/bin/env python3
import os
import re
from datetime import datetime
from pathlib import Path

def get_file_mtime(file_path):
    """Get file modification time."""
    try:
        return os.path.getmtime(file_path)
    except FileNotFoundError:
        return None

def get_first_heading(file_path):
    """Extract first-level heading from markdown file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find first level-1 heading (starts with single #)
        match = re.search(r'^# (.+)$', content, re.MULTILINE)
        if match:
            return match.group(1).strip()
        return None
    except Exception:
        return None

def normalize_name(name):
    """Normalize name for comparison (case-insensitive, no spaces)."""
    return name.lower().replace(' ', '').replace('_', '').replace('-', '')

def suggest_wiki_name(filename):
    """Suggest a wiki page name based on filename."""
    # Remove extension and convert to title case
    base = Path(filename).stem
    # Replace underscores/hyphens with spaces, then title case
    suggested = base.replace('_', ' ').replace('-', ' ')
    return suggested.title().replace(' ', '-')

def main():
    # Get all root-level .md files
    root_files = []
    for f in os.listdir('/root/minecraft-bot'):
        if f.endswith('.md'):
            root_files.append(f)
    
    # Get all docs/ .md files
    docs_files = []
    docs_path = '/root/minecraft-bot/docs'
    if os.path.exists(docs_path):
        for f in os.listdir(docs_path):
            if f.endswith('.md'):
                docs_files.append(f'docs/{f}')
    
    # Get all wiki .md files
    wiki_files = []
    wiki_path = '/root/minecraft-bot/wiki'
    if os.path.exists(wiki_path):
        for root, dirs, files in os.walk(wiki_path):
            for f in files:
                if f.endswith('.md'):
                    rel_path = os.path.relpath(os.path.join(root, f), wiki_path)
                    wiki_files.append(rel_path)
    
    # Create mapping of wiki files by normalized names and headings
    wiki_mapping = {}
    wiki_headings = {}
    
    for wiki_file in wiki_files:
        full_path = os.path.join(wiki_path, wiki_file)
        basename = os.path.basename(wiki_file)
        normalized = normalize_name(basename)
        wiki_mapping[normalized] = wiki_file
        
        # Also check first heading
        heading = get_first_heading(full_path)
        if heading:
            normalized_heading = normalize_name(heading)
            wiki_headings[normalized_heading] = wiki_file
    
    # Analyze gaps
    gaps = []
    
    # Check root files
    for root_file in root_files:
        full_path = f'/root/minecraft-bot/{root_file}'
        mtime = get_file_mtime(full_path)
        normalized_name = normalize_name(root_file)
        
        # Check if exists in wiki by filename
        wiki_match = None
        if normalized_name in wiki_mapping:
            wiki_match = wiki_mapping[normalized_name]
        else:
            # Check by first heading
            heading = get_first_heading(full_path)
            if heading:
                normalized_heading = normalize_name(heading)
                if normalized_heading in wiki_headings:
                    wiki_match = wiki_headings[normalized_heading]
        
        if wiki_match:
            wiki_full_path = os.path.join(wiki_path, wiki_match)
            wiki_mtime = get_file_mtime(wiki_full_path)
            if mtime > wiki_mtime:
                gaps.append({
                    'file': root_file,
                    'type': 'root',
                    'status': 'out-of-date',
                    'wiki_match': wiki_match,
                    'suggested_name': suggest_wiki_name(root_file),
                    'source_mtime': datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S'),
                    'wiki_mtime': datetime.fromtimestamp(wiki_mtime).strftime('%Y-%m-%d %H:%M:%S')
                })
        else:
            gaps.append({
                'file': root_file,
                'type': 'root',
                'status': 'missing',
                'wiki_match': None,
                'suggested_name': suggest_wiki_name(root_file),
                'source_mtime': datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S'),
                'wiki_mtime': 'N/A'
            })
    
    # Check docs files
    for docs_file in docs_files:
        full_path = f'/root/minecraft-bot/{docs_file}'
        mtime = get_file_mtime(full_path)
        basename = os.path.basename(docs_file)
        normalized_name = normalize_name(basename)
        
        # Check if exists in wiki by filename
        wiki_match = None
        if normalized_name in wiki_mapping:
            wiki_match = wiki_mapping[normalized_name]
        else:
            # Check by first heading
            heading = get_first_heading(full_path)
            if heading:
                normalized_heading = normalize_name(heading)
                if normalized_heading in wiki_headings:
                    wiki_match = wiki_headings[normalized_heading]
        
        if wiki_match:
            wiki_full_path = os.path.join(wiki_path, wiki_match)
            wiki_mtime = get_file_mtime(wiki_full_path)
            if mtime > wiki_mtime:
                gaps.append({
                    'file': docs_file,
                    'type': 'docs',
                    'status': 'out-of-date',
                    'wiki_match': wiki_match,
                    'suggested_name': suggest_wiki_name(basename),
                    'source_mtime': datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S'),
                    'wiki_mtime': datetime.fromtimestamp(wiki_mtime).strftime('%Y-%m-%d %H:%M:%S')
                })
        else:
            gaps.append({
                'file': docs_file,
                'type': 'docs',
                'status': 'missing',
                'wiki_match': None,
                'suggested_name': suggest_wiki_name(basename),
                'source_mtime': datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S'),
                'wiki_mtime': 'N/A'
            })
    
    # Generate report
    print("# Wiki Coverage Gap Report")
    print()
    print("## Summary")
    print(f"- Total root-level .md files: {len(root_files)}")
    print(f"- Total docs/ .md files: {len(docs_files)}")
    print(f"- Total wiki .md files: {len(wiki_files)}")
    print(f"- Missing files: {len([g for g in gaps if g['status'] == 'missing'])}")
    print(f"- Out-of-date files: {len([g for g in gaps if g['status'] == 'out-of-date'])}")
    print()
    
    # Generate CSV
    print("## CSV Format")
    print("File,Type,Status,Wiki Match,Suggested Wiki Name,Source Modified,Wiki Modified")
    for gap in gaps:
        print(f"{gap['file']},{gap['type']},{gap['status']},{gap['wiki_match'] or 'N/A'},{gap['suggested_name']},{gap['source_mtime']},{gap['wiki_mtime']}")
    
    print()
    print("## Markdown Table Format")
    print("| File | Type | Status | Wiki Match | Suggested Wiki Name | Source Modified | Wiki Modified |")
    print("|------|------|--------|------------|---------------------|-----------------|---------------|")
    for gap in gaps:
        print(f"| {gap['file']} | {gap['type']} | {gap['status']} | {gap['wiki_match'] or 'N/A'} | {gap['suggested_name']} | {gap['source_mtime']} | {gap['wiki_mtime']} |")

if __name__ == "__main__":
    main()
