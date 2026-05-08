import sys
from pathlib import Path

# Ensure the backend package directory is on sys.path so internal modules
# can import sibling packages like core, database, middleware, api, repositories,
# services, schemas, and models when the package is imported from the repository root.
package_dir = Path(__file__).resolve().parent
if str(package_dir) not in sys.path:
    sys.path.insert(0, str(package_dir))
