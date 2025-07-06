#!/usr/bin/env python3
import os
import re
from pathlib import Path

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
    
    print("=== WIKI FILES ===")
    for wf in wiki_files:
        full_path = os.path.join(wiki_path, wf)
        heading = get_first_heading(full_path)
        print(f"{wf} -> heading: '{heading}'")
    
    print("\n=== ROOT FILES ===")
    for rf in root_files:
        full_path = f'/root/minecraft-bot/{rf}'
        heading = get_first_heading(full_path)
        print(f"{rf} -> heading: '{heading}'")
    
    print("\n=== DOCS FILES (first 10) ===")
    for df in docs_files[:10]:
        full_path = f'/root/minecraft-bot/{df}'
        heading = get_first_heading(full_path)
        print(f"{df} -> heading: '{heading}'")
    
    print("\n=== POTENTIAL MATCHES ===")
    
    # Check for matches we might have missed
    matches_found = []
    
    # Check if CONTRIBUTING.md matches
    for rf in root_files:
        if rf == 'CONTRIBUTING.md':
            for wf in wiki_files:
                if 'Contributing' in wf:
                    matches_found.append(f"{rf} -> {wf}")
    
    # Check if HOME.md matches
    for rf in root_files:
        if rf == 'HOME.md':
            for wf in wiki_files:
                if 'Home' in wf:
                    matches_found.append(f"{rf} -> {wf}")
    
    # Check API docs
    for df in docs_files:
        if 'API' in df:
            for wf in wiki_files:
                if 'API' in wf:
                    matches_found.append(f"{df} -> {wf}")
    
    # Check commands
    for df in docs_files:
        if 'COMMAND' in df:
            for wf in wiki_files:
                if 'Command' in wf:
                    matches_found.append(f"{df} -> {wf}")
    
    for match in matches_found:
        print(match)

if __name__ == "__main__":
    main()
