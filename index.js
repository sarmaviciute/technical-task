/**
 * Create a list of all paths and their minimum access level
 * @param {Array<Object>} Registry array of routes
 * @returns {Array<Object>} modified registry
 */
const getAllAbsoluthPaths = (registry) => {
  return registry.map((registryItem) => {
    const parentPath = registry.find(
      (registryObject) => registryObject.path === registryItem.parent
    );
    const registryItemPath = registryItem.parent
      ? `${registryItem.parent}${registryItem.path}`
      : registryItem.path;

    let absolutePath = registryItemPath;
    let level = registryItem.level;

    if (parentPath && parentPath.parent) {
      absolutePath = `${parentPath.parent}${registryItemPath}`;
      level =
        parentPath.level > registryItem.level
          ? parentPath.level
          : registryItem.level;
    }

    return {
      absolutePath: absolutePath.replace('//', '/'),
      level,
    };
  });
};

/**
 * Check accessibilty for a user
 * @param {Object} User { name: string, level: number }
 * @param {String} Path path to check
 * @param {Array<Object>} ModifiedRegistry getAllAbsoluthPaths() result
 * @returns {Boolean} if the user has acces
 */
const hasAccess = (user, path, paths) => {
  const matchedRegistryPath = paths.find(
    (registryEntry) => registryEntry.absolutePath === path
  );
  if (!matchedRegistryPath) {
    return false;
  }

  return user.level >= matchedRegistryPath.level;
};

/**
 * Get all paths a user has access too
 * @param {Object} User { name: string, level: number }
 * @param {Array<Object>} ModifiedRegistry getAllAbsoluthPaths() result
 * @returns {Array<Object>} filtered array of routes
 */
const getUserPaths = (user, paths) => {
  return paths.filter((path) => hasAccess(user, path.absolutePath, paths));
};

module.exports = {
  getAllAbsoluthPaths,
  hasAccess,
  getUserPaths,
};
