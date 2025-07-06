# 🚀 Deployment Guide

This directory contains deployment configurations and guides for the Iron Anarchy Minecraft Bot.

## 📋 Available Deployment Options

### 1. 🐳 Docker Deployment
- **Workflow**: `deploy-docker.yml`
- **Platforms**: Multi-architecture (amd64, arm64)
- **Registry**: GitHub Container Registry (ghcr.io)
- **Environments**: Staging, Production

### 2. ☁️ Cloud Platform Deployment
- **Workflow**: `deploy-cloud.yml`
- **Platforms**: AWS, Google Cloud, Azure, DigitalOcean, Heroku
- **Features**: Auto-scaling, managed environments

### 3. 🖥️ VPS/Self-Hosted Deployment
- **Workflow**: `deploy-vps.yml`
- **Features**: SystemD services, health checks, rollback support
- **Environments**: Staging, Production

### 4. 📚 Documentation Deployment
- **Workflow**: `deploy-docs.yml`
- **Platform**: GitHub Pages
- **Features**: API docs, interactive website

### 5. 🎛️ Master Deployment Controller
- **Workflow**: `deploy-master.yml`
- **Features**: Orchestrates all deployment types, production safeguards

## 🚀 Quick Start

### Option 1: Use GitHub Actions Web Interface

1. Go to your repository's Actions tab
2. Select "🚀 Master Deployment Controller"
3. Click "Run workflow"
4. Choose your deployment type
5. For production deployments, type "CONFIRM" in the confirmation field

### Option 2: Use GitHub CLI

```bash
# Deploy to Docker registry
gh workflow run "🚀 Master Deployment Controller" \
  --field deployment_type=docker-registry

# Deploy to staging VPS
gh workflow run "🚀 Master Deployment Controller" \
  --field deployment_type=vps-staging

# Deploy to production (requires confirmation)
gh workflow run "🚀 Master Deployment Controller" \
  --field deployment_type=vps-production \
  --field confirm_production=CONFIRM

# Deploy to all environments (requires confirmation)
gh workflow run "🚀 Master Deployment Controller" \
  --field deployment_type=all-environments \
  --field confirm_production=CONFIRM
```

## 🔧 Configuration Requirements

### Docker Deployment
- No additional secrets required (uses GITHUB_TOKEN)

### Cloud Deployments

#### AWS
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (variable)
- `AWS_S3_BUCKET` (variable)

#### Google Cloud
- `GCP_SA_KEY` (service account JSON)
- `GCP_PROJECT_ID` (variable)

#### Azure
- `AZURE_CREDENTIALS` (service principal JSON)
- `AZURE_APP_NAME` (variable)
- `AZURE_RESOURCE_GROUP` (variable)

#### DigitalOcean
- `DIGITALOCEAN_ACCESS_TOKEN`

#### Heroku
- `HEROKU_API_KEY`
- `HEROKU_EMAIL`

### VPS Deployment
- `STAGING_SSH_KEY` / `PRODUCTION_SSH_KEY`
- `STAGING_HOST` / `PRODUCTION_HOST` (variables)
- `STAGING_USERNAME` / `PRODUCTION_USERNAME` (variables)
- `STAGING_PORT` / `PRODUCTION_PORT` (variables, optional)

### Optional
- `DISCORD_WEBHOOK_URL` (variable) - for deployment notifications

## 📁 File Structure

```
deployment/
├── README.md                 # This file
├── docker-compose.staging.yml    # Generated during deployment
├── docker-compose.production.yml # Generated during deployment
├── systemd/
│   ├── minecraft-bot.service     # Production SystemD service
│   └── minecraft-bot-staging.service # Staging SystemD service
└── scripts/
    ├── deploy.sh             # Manual deployment script
    ├── rollback.sh           # Manual rollback script
    └── health-check.sh       # Health check script
```

## 🔒 Security Features

- **Production Confirmation**: Production deployments require manual confirmation
- **Environment Isolation**: Separate configurations for staging/production
- **Health Checks**: Automatic service health verification
- **Rollback Support**: Automatic rollback on deployment failure
- **Secret Management**: Secure handling of sensitive credentials
- **Resource Limits**: Memory and CPU limits for containerized deployments

## 📊 Monitoring

After deployment, you can monitor your bot using:

- **GitHub Actions**: View deployment status and logs
- **Discord Notifications**: Real-time deployment status (if configured)
- **Health Endpoints**: HTTP health check endpoints (if enabled)
- **System Logs**: SystemD journal logs for VPS deployments

## 🆘 Troubleshooting

### Common Issues

1. **Docker Build Fails**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json

2. **Cloud Deployment Fails**
   - Verify cloud credentials are correctly configured
   - Check resource quotas and limits

3. **VPS Deployment Fails**
   - Verify SSH key permissions
   - Check server disk space and memory
   - Ensure target directories exist

4. **Health Check Fails**
   - Check bot configuration files
   - Verify network connectivity
   - Review application logs

### Getting Help

- Check the [Issues](https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues) page
- Review [Actions logs](https://github.com/Localacct21/iron-anarchy-minecraft-bot/actions) for detailed error messages
- Join our Discord community (if available)

## 🎯 Best Practices

1. **Always test in staging first**
2. **Use production confirmation for production deployments**
3. **Monitor deployment logs and health checks**
4. **Keep secrets and credentials secure**
5. **Maintain backup configurations**
6. **Document custom deployment modifications**

---

For more information, see the [main repository README](../README.md).
