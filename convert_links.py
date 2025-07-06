#!/usr/bin/env python3
import re
import os

def convert_relative_links(content):
    """Convert relative markdown links to wiki-style links."""
    
    # Pattern to match markdown links: [text](relative/path.md)
    pattern = r'\[([^\]]+)\]\(([^)]+\.md)\)'
    
    def replace_link(match):
        text = match.group(1)
        path = match.group(2)
        
        # Skip already converted wiki links and external links
        if path.startswith('http') or path.startswith('#') or '[[' in text:
            return match.group(0)
        
        # Convert relative path to wiki page name
        # Remove ../ and ./ prefixes
        clean_path = path.replace('../', '').replace('./', '')
        
        # Extract just the filename without extension
        if '/' in clean_path:
            filename = clean_path.split('/')[-1]
        else:
            filename = clean_path
        
        # Remove .md extension and convert to wiki format
        wiki_name = filename.replace('.md', '')
        
        # Convert kebab-case and other formats to wiki format
        wiki_name = wiki_name.replace('-', ' ').replace('_', ' ')
        
        # Capitalize words for wiki naming
        wiki_name = ' '.join(word.capitalize() for word in wiki_name.split())
        
        # Special cases for common wiki page names
        replacements = {
            'Api Reference': 'API Reference',
            'Contributing': 'Contributing',
            'Installation': 'Installation',
            'Home': 'Home',
            'Readme': 'README',
            'Command Reference': 'Command Reference',
            'Events': 'Events',
            'Configuration': 'Configuration'
        }
        
        wiki_name = replacements.get(wiki_name, wiki_name)
        
        return f'[[{wiki_name}]]'
    
    return re.sub(pattern, replace_link, content)

def process_file(filepath):
    """Process a single file to convert links."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = convert_relative_links(content)
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    wiki_dir = 'wiki'
    changed_files = []
    
    for root, dirs, files in os.walk(wiki_dir):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    changed_files.append(filepath)
    
    if changed_files:
        print(f"Converted links in {len(changed_files)} files:")
        for file in changed_files:
            print(f"  - {file}")
    else:
        print("No files needed link conversion")

if __name__ == '__main__':
    main()
