interface ConfigForRoot {
  dirname: string;
}

interface ConfigForFeature {
  filename: string;
}

type StoreConfig = ConfigForFeature & ConfigForRoot;

export { ConfigForFeature, ConfigForRoot, StoreConfig };
