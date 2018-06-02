import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEBUG = True


WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',  # end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-local.json'),
    }
}