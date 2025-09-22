# Contributing to the Online Banking Application

Thank you for your interest in contributing to our Online Banking Application! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

Bugs are tracked as GitHub issues. Create an issue and provide the following information:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the bug
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what you expected to see
- Include screenshots if possible
- Include details about your environment (OS, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are also tracked as GitHub issues. Provide the following information:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful to most users
- Include mockups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure they pass
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0
- Maven 3.8+
- Docker and Docker Compose (for containerized setup)

### Local Development

1. Clone your fork of the repository
2. Set up the development environment using Docker:
   ```
   make up
   ```
   Or use the manual setup as described in the README.md

## Coding Standards

### Java Code Style

- Follow the [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- Use meaningful variable and method names
- Write comprehensive JavaDoc comments
- Maintain a consistent package structure

### JavaScript/React Code Style

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use functional components with hooks instead of class components
- Use proper PropTypes for all components
- Maintain a consistent file structure

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:
- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Changes that do not affect the meaning of the code
- refactor: Code changes that neither fix a bug nor add a feature
- test: Adding or modifying tests
- chore: Changes to the build process or auxiliary tools

## Testing

- Write unit tests for all new features and bug fixes
- Ensure all tests pass before submitting a pull request
- Aim for high test coverage

## Documentation

- Update documentation for all new features and changes
- Use clear and concise language
- Include code examples where appropriate

## Review Process

- All submissions require review
- Maintainers will review your PR and provide feedback
- Changes may be requested before a PR is merged
- Be responsive to feedback and questions

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.