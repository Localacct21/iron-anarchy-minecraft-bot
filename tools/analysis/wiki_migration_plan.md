# Wiki Migration Action Plan

Based on the coverage gap analysis, here's a prioritized plan for updating the wiki:

## Priority 1: Out-of-date Files (3 items)

These files exist in the wiki but are outdated:

1. **INSTALLATION.md → guides/Installation.md**
   - Source: 2025-07-06 10:41:29
   - Wiki: 2025-07-06 10:33:58
   - Action: Update wiki with latest installation instructions

2. **README.md → README.md**
   - Source: 2025-07-06 10:49:31  
   - Wiki: 2025-07-06 10:35:04
   - Action: Update wiki README with latest project information

3. **docs/COMMAND_REFERENCE.md → reference/Commands.md**
   - Source: 2025-07-06 10:46:49
   - Wiki: 2025-07-06 10:34:21
   - Action: Update command reference with latest command documentation

## Priority 2: High-Value Missing Files (10 items)

Essential documentation that should be in the wiki:

### Core Project Files

- **SECURITY.md** → Security.md
- **CODE_OF_CONDUCT.md** → Code-Of-Conduct.md  
- **CHANGELOG.md** → Changelog.md
- **DEPLOYMENT_STATUS.md** → guides/Deployment-Status.md
- **RELEASE_NOTES_v2.0.2.md** → Release-Notes-V2.0.2.md

### User-Facing Documentation

- **docs/USER_GUIDE.md** → User-Guide.md
- **docs/FEATURES_OVERVIEW.md** → Features-Overview.md
- **docs/USAGE_EXAMPLES.md** → Usage-Examples.md
- **docs/TROUBLESHOOTING_GUIDE.md** → troubleshooting/Troubleshooting-Guide.md
- **docs/NPM_INSTALLATION_GUIDE.md** → guides/Npm-Installation-Guide.md

## Priority 3: Developer Documentation (5 items)

Technical documentation for contributors:

- **ARCHITECTURE_SUMMARY.md** → developer/Architecture-Summary.md
- **TYPEDEF_IMPLEMENTATION_SUMMARY.md** → Typedef-Implementation-Summary.md
- **docs/DEVELOPER_ARCHITECTURE.md** → community/Developer-Architecture.md
- **docs/GITHUB_PACKAGES.md** → Github-Packages.md
- **docs/PLUGIN_TYPES.md** → Plugin-Types.md

## Priority 4: Lower Priority Files (13 items)

These can be migrated after the above priorities:

### Testing & Analysis Reports

- docs/FEATURE_TEST_REPORT.md
- docs/ISSUES_FOUND.md
- docs/DASHBOARD_TEST_RESULTS.md
- docs/recording-validation-report.md
- docs/FINALIZATION_SUMMARY.md
- docs/PLUGIN_AUDIT_SUMMARY.md
- docs/PVP_PLUGIN_ANALYSIS.md

### Miscellaneous Documentation

- docs/DISCORD_INTEGRATION_GUIDE.md
- docs/ENHANCED_FEATURES.md
- docs/INSTRUCTIONS.md
- docs/DOCUMENTATION_INDEX.md
- docs/deprecation_fixes_summary.md

## Successfully Matched Files (3 items)

These files are already properly linked and up-to-date:

✅ **CONTRIBUTING.md** → community/Contributing.md
✅ **HOME.md** → Home.md  
✅ **docs/API_REFERENCE.md** → developer/API-Reference.md

## Recommended Wiki Structure

Based on the analysis, organize files into these categories:

```
wiki/
├── Home.md
├── README.md
├── Security.md
├── Code-Of-Conduct.md
├── Changelog.md
├── guides/
│   ├── Installation.md
│   ├── Quick-Start.md
│   ├── Deployment-Status.md
│   └── Npm-Installation-Guide.md
├── reference/
│   ├── Commands.md
│   └── Command-Reference.md
├── developer/
│   ├── API-Reference.md
│   ├── Architecture-Summary.md
│   └── Developer-Architecture.md
├── community/
│   └── Contributing.md
└── troubleshooting/
    ├── Common-Issues.md
    └── Troubleshooting-Guide.md
```
