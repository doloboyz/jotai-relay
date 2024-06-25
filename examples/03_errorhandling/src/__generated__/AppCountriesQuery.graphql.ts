/**
 * @generated SignedSource<<2e0d04d9247d4ce26a68fb694e03eb97>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CountryFilterInput = {
  code?: StringQueryOperatorInput | null | undefined;
  continent?: StringQueryOperatorInput | null | undefined;
  currency?: StringQueryOperatorInput | null | undefined;
};
export type StringQueryOperatorInput = {
  eq?: string | null | undefined;
  glob?: string | null | undefined;
  in?: ReadonlyArray<string | null | undefined> | null | undefined;
  ne?: string | null | undefined;
  nin?: ReadonlyArray<string | null | undefined> | null | undefined;
  regex?: string | null | undefined;
};
export type appCountriesQuery$variables = {
  filter?: CountryFilterInput | null | undefined;
};
export type appCountriesQuery$data = {
  readonly countries: ReadonlyArray<{
    readonly name: string;
  }>;
};
export type appCountriesQuery = {
  response: appCountriesQuery$data;
  variables: appCountriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filter"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter"
      }
    ],
    "concreteType": "Country",
    "kind": "LinkedField",
    "name": "countries",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "appCountriesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "appCountriesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "333d85f9001403fe443ec3991460cedd",
    "id": null,
    "metadata": {},
    "name": "appCountriesQuery",
    "operationKind": "query",
    "text": "query appCountriesQuery(\n  $filter: CountryFilterInput\n) {\n  countries(filter: $filter) {\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "ed0de3557511a78a8131ae0f6530072c";

export default node;
