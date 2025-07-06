# 🔒 Security Policy

## 🛡️ Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | ✅ Yes             |
| 1.x.x   | ❌ No              |

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

### 📧 Contact Information

- **Email**: [localacct@ironanarchy.lol](mailto:localacct@ironanarchy.lol)
- **Subject**: "Security Vulnerability Report - Iron Anarchy Bot"

### 📝 What to Include

Please include the following information:

1. **Description** of the vulnerability
2. **Steps to reproduce** the issue
3. **Potential impact** assessment
4. **Suggested fix** (if available)
5. **Your contact information** for follow-up

### ⏰ Response Timeline

- **Initial Response**: Within 24 hours
- **Vulnerability Assessment**: Within 72 hours
- **Fix Development**: Within 7 days (for critical issues)
- **Release**: Within 14 days

### 🔐 Security Measures

Our security practices include:

- **Automated Security Scanning** via CodeQL
- **Dependency Vulnerability Scanning** 
- **Container Security** with non-root users
- **Regular Security Updates**
- **Secure Coding Practices**

### 🏆 Recognition

Security researchers who responsibly disclose vulnerabilities will be:

- **Credited** in release notes (with permission)
- **Listed** in our security acknowledgments
- **Thanked** publicly (unless anonymity requested)

## 🛠️ Security Best Practices

When using the Iron Anarchy Minecraft Bot:

### 🔒 Authentication
- Use strong, unique passwords
- Enable 2FA where possible
- Rotate credentials regularly

### 🐳 Container Security
```bash
# Run with security constraints
docker run --security-opt=no-new-privileges:true \
  --read-only --tmpfs /tmp \
  --user 1001:1001 \
  ghcr.io/localacct21/iron-anarchy-minecraft-bot:latest
```

### 🌐 Network Security
- Use firewalls to restrict access
- Enable TLS/SSL where possible
- Monitor network traffic

### 📊 Monitoring
- Enable audit logging
- Monitor for suspicious activity
- Set up alerts for security events

## 🔄 Security Updates

Security updates are released as:

- **Patch releases** for minor issues
- **Minor releases** for moderate issues  
- **Emergency releases** for critical issues

Subscribe to [GitHub Releases](https://github.com/Localacct21/iron-anarchy-minecraft-bot/releases) for notifications.

## 🤝 Security Community

Join our security community:

- [GitHub Security Advisories](https://github.com/Localacct21/iron-anarchy-minecraft-bot/security/advisories)
- [Security Discussions](https://github.com/Localacct21/iron-anarchy-minecraft-bot/discussions/categories/security)

Thank you for helping keep Iron Anarchy Minecraft Bot secure! 🛡️
