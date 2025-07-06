#!/usr/bin/env python3
import csv
import os

def verify_wiki_gaps():
    """Verify that all gap files have been addressed."""
    gaps_filled = []
    gaps_remaining = []
    
    # Read the CSV gap report
    try:
        with open('final_wiki_coverage_gap_report.csv', 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row['status'] in ['missing', 'out-of-date']:
                    suggested_path = row['suggested_path']
                    wiki_path = f"wiki/{suggested_path}"
                    
                    if os.path.exists(wiki_path):
                        gaps_filled.append({
                            'source': row['file'],
                            'wiki_path': wiki_path,
                            'status': row['status']
                        })
                    else:
                        gaps_remaining.append({
                            'source': row['file'],
                            'wiki_path': wiki_path,
                            'status': row['status']
                        })
    except FileNotFoundError:
        print("Gap report CSV not found")
        return
    
    print(f"✅ Gaps filled: {len(gaps_filled)}")
    for gap in gaps_filled:
        print(f"   {gap['source']} → {gap['wiki_path']}")
    
    if gaps_remaining:
        print(f"\n❌ Gaps remaining: {len(gaps_remaining)}")
        for gap in gaps_remaining:
            print(f"   {gap['source']} → {gap['wiki_path']} (missing)")
    else:
        print(f"\n🎉 All gaps have been filled!")
    
    return len(gaps_remaining) == 0

if __name__ == '__main__':
    success = verify_wiki_gaps()
    exit(0 if success else 1)
