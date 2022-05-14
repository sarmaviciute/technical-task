/**
 * Create a list of all paths and their minimum access level
 * @param {Array<Object>} Registry array of routes
 * @returns {Array<Object>} modified registry
 */
const getAllAbsoluthPaths = (registry) => {
  return registry.map((registryItem) => {
    let parentPaths = findParentPath(registry, registryItem);
    if (!parentPaths) {
      return {
        absolutePath: registryItem.path,
        level: registryItem.level,
      };
    }
    const highestParentLevel = Math.max(
      ...parentPaths.map((path) => path.level),
      0
    );
    parentPaths = parentPaths
      .map((registryObject) => registryObject.path)
      .join('');

    return {
      absolutePath: `${parentPaths}${registryItem.path}`.replace('//', '/'),
      level:
        highestParentLevel > registryItem.level
          ? highestParentLevel
          : registryItem.level,
    };
  });
};

const findParentPath = (registry, registryItem) => {
  if (!registryItem.parent) return [];

  const parentPath = registry.find(
    (registryEntry) => registryEntry.path === registryItem.parent
  );

  return [
    ...findParentPath(registry, parentPath),
    { path: parentPath.path, level: parentPath.level },
  ];
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
