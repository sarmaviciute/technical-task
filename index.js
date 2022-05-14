/**
 * Create a list of all paths and their minimum access level
 * @param {Array<Object>} Registry array of routes
 * @returns {Array<Object>} modified registry
 */
const getAllAbsoluthPaths = (registry) => {
  return registry
}

/**
 * Check accessibilty for a user
 * @param {Object} User { name: string, level: number }
 * @param {String} Path path to check
 * @param {Array<Object>} ModifiedRegistry getAllAbsoluthPaths() result
 * @returns {Boolean} if the user has acces
 */
const hasAccess = (user, path, paths) => {
  return false
}

/**
 * Get all paths a user has access too
 * @param {Object} User { name: string, level: number }
 * @param {Array<Object>} ModifiedRegistry getAllAbsoluthPaths() result
 * @returns {Array<Object>} filtered array of routes
 */
const getUserPaths = (user, paths) => {
  return []
}

module.exports = {
  getAllAbsoluthPaths,
  hasAccess,
  getUserPaths
}
