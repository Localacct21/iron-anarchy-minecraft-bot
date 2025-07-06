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
├── bot/                   # Core bot functionality
├── plugins/               # Bot plugins
├── utils/                 # Utility functions
└── config/                # Configuration modules
```

## Configuration
```
config/
├── bot-config.js          # Bot configuration
├── discord-config.js      # Discord integration config
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
├── guides/              # User guides
├── developer/           # Developer documentation
├── community/           # Community resources
├── reference/           # Reference materials
├── troubleshooting/     # Help and troubleshooting
├── images/              # Wiki images and diagrams
└── screenshots/         # Application screenshots
```

## Development Tools
```
tools/
├── analysis/            # Repository analysis scripts
│   ├── gap_analysis.py
│   ├── wiki_migration_*.md
│   └── [other analysis tools]
├── backups/            # Backup files
├── packages/           # Package variant files
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
├── logs/               # Application logs
├── recordings/         # Bot session recordings
├── screenshots/        # Generated screenshots
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
- `wiki/` - Complete project wiki

### Configuration
- `.env.example` - Environment configuration template
- `config/` - Application configuration files

### Development
- `tools/` - Development and analysis tools
- `tests/` - Test suite
- `scripts/` - Utility scripts

## Best Practices

1. **Keep root clean** - Only essential files in the root directory
2. **Logical grouping** - Related files in appropriate subdirectories
3. **Clear naming** - Descriptive directory and file names
4. **Documentation** - Maintain this structure document
5. **Consistent organization** - Follow established patterns

## Navigation

- For users: Start with `README.md` then `wiki/Home.md`
- For developers: See `CONTRIBUTING.md` and `docs/developer/`
- For deployment: Check `docs/project-info/DEPLOYMENT_STATUS.md`
- For API usage: Refer to `docs/API_REFERENCE.md`
