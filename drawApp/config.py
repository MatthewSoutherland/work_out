class Config(object):
    """Base configuration."""

    SECRET_KEY = "your_secret_key_here"

    TEMPLATES_AUTO_RELOAD = True


class DevelopmentConfig(Config):
    """Development configuration."""

    DEBUG = True


class ProductionConfig(Config):
    """Production configuration."""

    DEBUG = False


class TestingConfig(Config):
    """Testing configuration."""

    TESTING = True

