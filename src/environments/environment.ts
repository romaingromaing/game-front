// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: `https://testnet.bora-lagoon.com/`,
  bpapi: `https://testnet-explorerapi.bora-lagoon.com`,
  explorer: `https://testnet-explorer.bora-lagoon.com`,
  portal: `https://testnet.bora-lagoon.com/portal/`,
  authredirecturi: 'http://localhost:4200/cb',
  gameuri: 'http://127.0.0.1:3200/',
  localuri: 'http://localhost:4200',
  gameclientId: 'X0yT6nI69Q',
  gameclientSecret: 'yM5pnll9GwdMjkapd7MWX0',
  gameappId: 100004,
};
