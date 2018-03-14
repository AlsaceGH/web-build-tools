[Home](./index) &gt; [@microsoft/api-extractor](api-extractor.md) &gt; [IExtractorRuntimeCompilerConfig](api-extractor.iextractorruntimecompilerconfig.md)

# IExtractorRuntimeCompilerConfig interface

With this configuration, API Extractor is configured using an already prepared compiler state that is provided programmatically at runtime. This can potentially enable faster builds, by reusing the same compiler invocation for tsc, tslint, and API Extractor.

If configType='runtime' is specified, then IExtractorRuntimeOptions.compilerProgram must be provided.

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [`configType`](api-extractor.iextractorruntimecompilerconfig.configtype.md) | `'runtime'` |  |
