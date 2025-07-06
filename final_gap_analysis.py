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

def find_matches(source_file, source_path, wiki_files, wiki_path):
    """Find matching wiki files for a source file."""
    basename = os.path.basename(source_file)
    normalized_name = normalize_name(basename)
    heading = get_first_heading(source_path)
    
    # Check exact filename matches first
    for wiki_file in wiki_files:
        wiki_basename = os.path.basename(wiki_file)
        if normalize_name(wiki_basename) == normalized_name:
            return wiki_file
    
    # Check by first heading
    if heading:
        normalized_heading = normalize_name(heading)
        for wiki_file in wiki_files:
            wiki_full_path = os.path.join(wiki_path, wiki_file)
            wiki_heading = get_first_heading(wiki_full_path)
            if wiki_heading and normalize_name(wiki_heading) == normalized_heading:
                return wiki_file
    
    # Special cases for common mappings
    special_mappings = {
        'contributing.md': 'community/Contributing.md',
        'home.md': 'Home.md',
        'api_reference.md': 'developer/API-Reference.md',
        'apireference.md': 'developer/API-Reference.md',
        'command_reference.md': 'reference/Commands.md',
        'commandreference.md': 'reference/Commands.md',
        'commands.md': 'reference/Commands.md'
    }
    
    if normalized_name in special_mappings:
        target = special_mappings[normalized_name]
        if target in wiki_files:
            return target
    
    return None

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
    
    # Analyze gaps
    gaps = []
    matches = []
    
    # Check root files
    for root_file in root_files:
        full_path = f'/root/minecraft-bot/{root_file}'
        mtime = get_file_mtime(full_path)
        size = get_file_size(full_path)
        heading = get_first_heading(full_path)
        
        wiki_match = find_matches(root_file, full_path, wiki_files, wiki_path)
        
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
                matches.append({
                    'file': root_file,
                    'type': 'root',
                    'status': 'up-to-date',
                    'wiki_match': wiki_match,
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
        
        wiki_match = find_matches(docs_file, full_path, wiki_files, wiki_path)
        
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
                    'suggested_name': suggest_wiki_name(os.path.basename(docs_file)),
                    'suggested_path': suggest_wiki_path(os.path.basename(docs_file), 'docs'),
                    'source_mtime': datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S'),
                    'wiki_mtime': datetime.fromtimestamp(wiki_mtime).strftime('%Y-%m-%d %H:%M:%S'),
                    'source_size': size,
                    'wiki_size': wiki_size,
                    'first_heading': heading or 'N/A'
                })
            else:
                matches.append({
                    'file': docs_file,
                    'type': 'docs',
                    'status': 'up-to-date',
                    'wiki_match': wiki_match,
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
                'suggested_name': suggest_wiki_name(os.path.basename(docs_file)),
                'suggested_path': suggest_wiki_path(os.path.basename(docs_file), 'docs'),
                'source_mtime': datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S'),
                'wiki_mtime': 'N/A',
                'source_size': size,
                'wiki_size': 0,
                'first_heading': heading or 'N/A'
            })
    
    # Write comprehensive CSV report
    with open('final_wiki_coverage_gap_report.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['file', 'type', 'status', 'wiki_match', 'suggested_name', 
                     'suggested_path', 'source_mtime', 'wiki_mtime', 'source_size', 
                     'wiki_size', 'first_heading']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for gap in gaps:
            writer.writerow(gap)
    
    # Generate summary report
    print("# Final Wiki Coverage Gap Analysis Report")
    print()
    print("## Summary")
    print(f"- Total root-level .md files: {len(root_files)}")
    print(f"- Total docs/ .md files: {len(docs_files)}")
    print(f"- Total wiki .md files: {len(wiki_files)}")
    print(f"- Files with matching wiki pages: {len(matches)}")
    print(f"- Missing files: {len([g for g in gaps if g['status'] == 'missing'])}")
    print(f"- Out-of-date files: {len([g for g in gaps if g['status'] == 'out-of-date'])}")
    print()
    
    print("## Matched Files (Up-to-date)")
    print("| File | Type | Wiki Match | Source Modified | Wiki Modified |")
    print("|------|------|------------|-----------------|---------------|")
    for match in matches:
        print(f"| {match['file']} | {match['type']} | {match['wiki_match']} | {match['source_mtime']} | {match['wiki_mtime']} |")
    
    print()
    print("## Gap Files (Missing or Out-of-date)")
    print("| File | Type | Status | Wiki Match | Suggested Path | Source Modified | Wiki Modified |")
    print("|------|------|--------|------------|----------------|-----------------|---------------|")
    for gap in gaps:
        print(f"| {gap['file']} | {gap['type']} | {gap['status']} | {gap['wiki_match'] or 'N/A'} | {gap['suggested_path']} | {gap['source_mtime']} | {gap['wiki_mtime']} |")
    
    print()
    print(f"Generated final CSV report: final_wiki_coverage_gap_report.csv")

if __name__ == "__main__":
    main()
