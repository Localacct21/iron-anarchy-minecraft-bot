#!/usr/bin/env python3
import os
import re
import csv
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

def get_file_size(file_path):
    """Get file size in bytes."""
    try:
        return os.path.getsize(file_path)
    except FileNotFoundError:
        return 0

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

def suggest_wiki_path(filename, file_type):
    """Suggest a wiki path based on content type."""
    base = Path(filename).stem.lower()
    
    # Categorize by content type
    if any(word in base for word in ['install', 'setup', 'deploy']):
        return f"guides/{suggest_wiki_name(filename)}.md"
    elif any(word in base for word in ['api', 'reference', 'command']):
        return f"reference/{suggest_wiki_name(filename)}.md"
    elif any(word in base for word in ['troubleshoot', 'issue', 'problem']):
        return f"troubleshooting/{suggest_wiki_name(filename)}.md"
    elif any(word in base for word in ['contribute', 'develop']):
        return f"community/{suggest_wiki_name(filename)}.md"
    elif any(word in base for word in ['architecture', 'design', 'structure']):
        return f"developer/{suggest_wiki_name(filename)}.md"
    else:
        return f"{suggest_wiki_name(filename)}.md"

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
        size = get_file_size(full_path)
        heading = get_first_heading(full_path)
        normalized_name = normalize_name(root_file)
        
        # Check if exists in wiki by filename
        wiki_match = None
        if normalized_name in wiki_mapping:
            wiki_match = wiki_mapping[normalized_name]
        else:
            # Check by first heading
            if heading:
                normalized_heading = normalize_name(heading)
                if normalized_heading in wiki_headings:
                    wiki_match = wiki_headings[normalized_heading]
        
        if wiki_match:
            wiki_full_path = os.path.join(wiki_path, wiki_match)
            wiki_mtime = get_file_mtime(wiki_full_path)
            wiki_size = get_file_size(wiki_full_path)
            if mtime > wiki_mtime:
                gaps.append({
                    'file': root_file,
                    'type': 'root',
                    'status': 'out-of-date',
                    'wiki_match': wiki_match,
                    'suggested_name': suggest_wiki_name(root_file),
                    'suggested_path': suggest_wiki_path(root_file, 'root'),
                    'source_mtime': datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S'),
                    'wiki_mtime': datetime.fromtimestamp(wiki_mtime).strftime('%Y-%m-%d %H:%M:%S'),
                    'source_size': size,
                    'wiki_size': wiki_size,
                    'first_heading': heading or 'N/A'
                })
        else:
            gaps.append({
                'file': root_file,
                'type': 'root',
                'status': 'missing',
                'wiki_match': None,
                'suggested_name': suggest_wiki_name(root_file),
                'suggested_path': suggest_wiki_path(root_file, 'root'),
                'source_mtime': datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S'),
                'wiki_mtime': 'N/A',
                'source_size': size,
                'wiki_size': 0,
                'first_heading': heading or 'N/A'
            })
    
    # Check docs files
    for docs_file in docs_files:
        full_path = f'/root/minecraft-bot/{docs_file}'
        mtime = get_file_mtime(full_path)
        size = get_file_size(full_path)
        heading = get_first_heading(full_path)
        basename = os.path.basename(docs_file)
        normalized_name = normalize_name(basename)
        
        # Check if exists in wiki by filename
        wiki_match = None
        if normalized_name in wiki_mapping:
            wiki_match = wiki_mapping[normalized_name]
        else:
            # Check by first heading
            if heading:
                normalized_heading = normalize_name(heading)
                if normalized_heading in wiki_headings:
                    wiki_match = wiki_headings[normalized_heading]
        
        if wiki_match:
            wiki_full_path = os.path.join(wiki_path, wiki_match)
            wiki_mtime = get_file_mtime(wiki_full_path)
            wiki_size = get_file_size(wiki_full_path)
            if mtime > wiki_mtime:
                gaps.append({
                    'file': docs_file,
                    'type': 'docs',
                    'status': 'out-of-date',
                    'wiki_match': wiki_match,
                    'suggested_name': suggest_wiki_name(basename),
                    'suggested_path': suggest_wiki_path(basename, 'docs'),
                    'source_mtime': datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S'),
                    'wiki_mtime': datetime.fromtimestamp(wiki_mtime).strftime('%Y-%m-%d %H:%M:%S'),
                    'source_size': size,
                    'wiki_size': wiki_size,
                    'first_heading': heading or 'N/A'
                })
        else:
            gaps.append({
                'file': docs_file,
                'type': 'docs',
                'status': 'missing',
                'wiki_match': None,
                'suggested_name': suggest_wiki_name(basename),
                'suggested_path': suggest_wiki_path(basename, 'docs'),
                'source_mtime': datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S'),
                'wiki_mtime': 'N/A',
                'source_size': size,
                'wiki_size': 0,
                'first_heading': heading or 'N/A'
            })
    
    # Write CSV report
    with open('wiki_coverage_gap_report.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['file', 'type', 'status', 'wiki_match', 'suggested_name', 
                     'suggested_path', 'source_mtime', 'wiki_mtime', 'source_size', 
                     'wiki_size', 'first_heading']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for gap in gaps:
            writer.writerow(gap)
    
    print(f"Generated detailed CSV report: wiki_coverage_gap_report.csv")
    print(f"Total gaps found: {len(gaps)}")
    print(f"Missing files: {len([g for g in gaps if g['status'] == 'missing'])}")
    print(f"Out-of-date files: {len([g for g in gaps if g['status'] == 'out-of-date'])}")

if __name__ == "__main__":
    main()
