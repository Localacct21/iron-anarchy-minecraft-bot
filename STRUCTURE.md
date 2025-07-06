# Repository Structure

This document describes the organization of the Iron-Anarchy Minecraft Bot repository.

## Root Directory
```
├── README.md              # Main project documentation
├── LICENSE                # MIT License
├── package.json           # Node.js dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── index.js               # Main application entry point
├── Dockerfile             # Docker container configuration
├── docker-compose.yml     # Docker Compose setup
├── CODE_OF_CONDUCT.md     # Community guidelines
├── CONTRIBUTING.md        # Contribution guidelines
├── SECURITY.md            # Security policies
└── STRUCTURE.md           # This file
```

## Configuration Files
```
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore patterns
├── .npmignore             # NPM ignore patterns
├── .npmrc                 # NPM configuration
└── .markdownlint.json     # Markdown linting rules
```

## Source Code
```
src/
├── bots/                  # Bot implementations
│   ├── bot.js             # Basic bot
│   ├── advanced-bot.js    # Advanced features
│   ├── ironanarchy-bot.js # Main bot implementation
│   ├── enhanced-discord-bot.js # Discord integration
│   └── enhanced-ironanarchy-bot-with-logs.js
├── plugins/               # Bot plugins (empty - ready for plugins)
└── utils/                 # Utility functions
    ├── plugin-loader.js   # Plugin management
    ├── plugin-validator.js # Plugin validation
    └── plugin-types.js    # Plugin type definitions
```

## Configuration
```
config/
├── config.json.example    # Bot configuration template
├── discord-config.json.example # Discord integration config
├── test-config.json       # Test configuration
└── jsdoc.json            # JSDoc documentation config
```

## Documentation
```
docs/
├── project-info/          # Project documentation files
│   ├── ARCHITECTURE_SUMMARY.md
│   ├── CHANGELOG.md
│   ├── DEPLOYMENT_STATUS.md
│   ├── HOME.md
│   ├── INSTALLATION.md
│   ├── RELEASE_NOTES_v2.0.2.md
│   └── TYPEDEF_IMPLEMENTATION_SUMMARY.md
├── architecture/          # Architecture diagrams and specs
├── API_REFERENCE.md       # API documentation
├── USER_GUIDE.md         # User manual
└── [other documentation files]
```

## Wiki
```
wiki/
├── Home.md               # Wiki home page
├── _Sidebar.md           # Wiki navigation
├── Installation-Guide.md # Installation guide
├── API-Reference.md      # API documentation
├── Architecture.md       # Architecture details
├── Contributing.md       # Contribution guide
├── Security.md           # Security policies
├── Troubleshooting-Guide.md # Help guide
├── images/              # Wiki images and diagrams
├── screenshots/         # Application screenshots
└── [43 total wiki pages - all in flat structure]
```

## Development Tools
```
tools/
├── analysis/            # Repository analysis scripts
│   ├── gap_analysis.py
│   ├── wiki_migration_*.md
│   └── [other analysis tools]
├── backups/            # Backup files
│   ├── README.md.backup-*
│   └── package.json.backup
├── packages/           # Package variant files
│   ├── package-github.json
│   ├── package-npm.json
│   └── [other package variants]
└── plantuml/           # PlantUML diagram generation
    └── plantuml.jar
```

## Testing
```
tests/
├── unit/               # Unit tests
├── integration/        # Integration tests
└── fixtures/           # Test fixtures
```

## Runtime Directories
```
├── logs/               # Application logs (.gitkeep)
├── recordings/         # Bot session recordings
├── screenshots/        # Generated screenshots (.gitkeep)
└── examples/           # Usage examples
```

## Scripts
```
scripts/
├── install-setup.sh    # Installation script
├── verify-installation.sh # Installation verification
└── [other utility scripts]
```

## GitHub Integration
```
.github/
├── ISSUE_TEMPLATE/     # Issue templates
├── workflows/          # GitHub Actions
└── pull_request_template.md
```

## Key Files

### Entry Points
- `index.js` - Main application entry point
- `package.json` - Project metadata and dependencies

### Documentation
- `README.md` - Project overview and quick start
- `docs/project-info/INSTALLATION.md` - Detailed installation guide
- `wiki/` - Complete project wiki (GitHub wiki format)

### Configuration
- `.env.example` - Environment configuration template
- `config/` - Application configuration files

### Development
- `tools/` - Development and analysis tools
- `tests/` - Test suite
- `scripts/` - Utility scripts

## Repository Organization Principles

1. **Clean Root Directory** - Only essential files in root
2. **Logical Grouping** - Related files in appropriate subdirectories
3. **Clear Naming** - Descriptive directory and file names
4. **Documentation Separation** - Wiki vs docs distinction
5. **Development Tools Isolation** - Tools separate from application code

## Navigation

- **For Users**: Start with `README.md` then `wiki/Home.md`
- **For Developers**: See `CONTRIBUTING.md` and `docs/API_REFERENCE.md`
- **For Deployment**: Check `docs/project-info/DEPLOYMENT_STATUS.md`
- **For API Usage**: Refer to `wiki/API-Reference.md`

## File Counts
- **Root files**: 17 (essential files only)
- **Wiki pages**: 43 (flat structure for GitHub wiki)
- **Documentation files**: 20+ (comprehensive coverage)
- **Source files**: 10+ (organized by functionality)

---

*This structure ensures maintainability, clarity, and ease of navigation for both users and contributors.*
