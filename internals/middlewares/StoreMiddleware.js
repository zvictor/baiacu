export default function resolve(next, root, { field }, context, info) {
  if (field in root) {
    return root[field];
  }

  return root._store[field];
};
