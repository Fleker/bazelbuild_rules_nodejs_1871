package(default_visibility = ["//visibility:public"])
exports_files(
  ["_package.json", "tsconfig.json"],
  visibility = ["//visibility:public"]
)

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")
load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@bazel_skylib//rules:copy_file.bzl", "copy_file")
load("@bazel_skylib//rules:run_binary.bzl", "run_binary")

# This is simplified to a copy_file step for demo purposes
# but could be handled in other ways
copy_file(
  name = "types",
  src = ":_types.ts",
  out = "types.ts"
)

# This is simplified to a copy_file step for demo purposes
# but could be handled in other ways
copy_file(
  name = "extension",
  src = ":_extension.ts",
  out = "extension.ts"
)

copy_file(
  name = "core",
  src = ":_core.ts",
  out = "core.ts"
)

ts_library(
  name = "core-lib",
  srcs = [":core"],
)

# https://github.com/bazelbuild/rules_nodejs/blob/master/docs/TypeScript.md
filegroup(
  name = "node_modules",
  srcs = glob(
    include = [
      "node_modules/**/*.js",
      "node_modules/**/*.d.ts",
      "node_modules/**/*.json",
      "node_modules/.bin/*",
    ],
    exclude = [
      # Files under test & docs may contain file names that
      # are not legal Bazel labels (e.g.,
      # node_modules/ecstatic/test/public/中文/檔案.html)
      "node_modules/**/test/**",
      "node_modules/**/docs/**",
      # Files with spaces in the name are not legal Bazel labels
      "node_modules/**/* */**",
      "node_modules/**/* *",
    ],
  ),
)

# Create a tsc_wrapped compiler rule to use in the ts_library
# compiler attribute when using self-managed dependencies
nodejs_binary(
  name = "tsc_wrapped",
  entry_point = "@npm//:node_modules/@bazel/typescript/internal/tsc_wrapped/tsc_wrapped.js",
  # Point bazel to your node_modules to find the entry point
  node_modules = ":node_modules",
)

ts_library(
  name = "lib",
  srcs = [":types", ":extension"],
  # Comment out node_modules method and compiler
  #node_modules = ":node_modules",
  #compiler = ":tsc_wrapped",
  deps = [":core-lib",
    # Or comment out specific import
    "@npm//googleapis"
  ]
)

copy_file(
  name = "package",
  src = ":_package.json",
  out = "package.json"
)
