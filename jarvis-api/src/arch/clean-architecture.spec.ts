import 'tsarch/dist/jest';
import { filesOfProject } from 'tsarch';
import * as path from 'path';

const tsConfigFilePath = path.resolve(__dirname, '..', '..', 'tsconfig.app.json');

const projectFiles = () => filesOfProject(tsConfigFilePath);

const LAYERS = ['domain', 'application', 'infrastructure', 'presentation'] as const;

const FORBIDDEN_LAYER_DEPENDENCIES: Record<string, string[]> = {
  domain: ['application', 'infrastructure', 'presentation'],
  application: ['infrastructure', 'presentation'],
  infrastructure: ['application', 'presentation'],
  presentation: ['infrastructure'],
};

const FEATURE_MODULES = ['trucks', 'notification'] as const;

const CROSS_CUTTING_MODULES = ['shared', 'logging', 'prisma'] as const;

const ALL_MODULES = [...FEATURE_MODULES, ...CROSS_CUTTING_MODULES] as const;

const NAMING_RULES: { pattern: string; folder: string; description: string }[] = [
  { pattern: '.*.usecase.*', folder: 'application', description: 'use case' },
  { pattern: '.*.controller.*', folder: 'presentation', description: 'controller' },
  { pattern: '.*\\.entity\\.ts$', folder: 'domain', description: 'entity' },
  { pattern: '.*\\.error\\.ts$', folder: 'domain', description: 'domain error' },
  { pattern: '.*\\.event\\.ts$', folder: 'domain', description: 'domain event' },
  { pattern: '.*\\.dto\\.ts$', folder: 'presentation', description: 'DTO' },
  { pattern: '.*\\.mapper\\.ts$', folder: 'presentation', description: 'mapper' },
  { pattern: '.*\\.handler\\.ts$', folder: 'presentation', description: 'handler' },
  { pattern: '.*\\.types\\.ts$', folder: 'application', description: 'types' },
];

describe('Clean Architecture Rules', () => {
  jest.setTimeout(60000);

  describe('Layer Dependencies', () => {
    it.each(
      Object.entries(FORBIDDEN_LAYER_DEPENDENCIES).flatMap(([layer, forbidden]) =>
        forbidden.map((dep) => ({ layer, dep })),
      ),
    )('$layer should NOT depend on $dep', async ({ layer, dep }) => {
      const rule = projectFiles().inFolder(layer).shouldNot().dependOnFiles().inFolder(dep);

      await expect(rule).toPassAsync();
    });
  });

  describe('Shared Module Independence', () => {
    it.each(FEATURE_MODULES)('shared should NOT depend on %s module', async (featureModule) => {
      const rule = projectFiles()
        .inFolder('modules/shared')
        .shouldNot()
        .dependOnFiles()
        .inFolder(`modules/${featureModule}`);

      await expect(rule).toPassAsync();
    });
  });

  describe('Cross-Module Isolation', () => {
    const crossModulePairs = FEATURE_MODULES.flatMap((source) =>
      FEATURE_MODULES.filter((target) => target !== source).flatMap((target) =>
        LAYERS.filter((layer) => layer !== 'domain').map((layer) => ({
          source,
          target,
          layer,
        })),
      ),
    );

    it.each(crossModulePairs)(
      '$source should NOT depend on $target/$layer',
      async ({ source, target, layer }) => {
        const rule = projectFiles()
          .inFolder(`modules/${source}`)
          .shouldNot()
          .dependOnFiles()
          .inFolder(`modules/${target}/${layer}`);

        await expect(rule).toPassAsync();
      },
    );
  });

  describe('Cross-Cutting Module Isolation', () => {
    const crossCuttingPairs = CROSS_CUTTING_MODULES.flatMap((crossCutting) =>
      FEATURE_MODULES.map((feature) => ({ crossCutting, feature })),
    );

    it.each(crossCuttingPairs)(
      '$crossCutting should NOT depend on $feature module',
      async ({ crossCutting, feature }) => {
        const rule = projectFiles()
          .inFolder(`modules/${crossCutting}`)
          .shouldNot()
          .dependOnFiles()
          .inFolder(`modules/${feature}`);

        await expect(rule).toPassAsync();
      },
    );

    it('logging should NOT depend on shared module', async () => {
      const rule = projectFiles()
        .inFolder('modules/logging')
        .shouldNot()
        .dependOnFiles()
        .inFolder('modules/shared');

      await expect(rule).toPassAsync();
    });
  });

  describe('No Circular Dependencies', () => {
    it.each(ALL_MODULES)('%s module should be free of cycles', async (moduleName) => {
      const rule = projectFiles().inFolder(`modules/${moduleName}`).should().beFreeOfCycles();

      await expect(rule).toPassAsync();
    });
  });

  describe('Naming Conventions', () => {
    it.each(NAMING_RULES)(
      '$description files should reside in $folder folder',
      async ({ pattern, folder }) => {
        const rule = projectFiles().matchingPattern(pattern).should().beInFolder(folder);

        await expect(rule).toPassAsync();
      },
    );
  });
});
