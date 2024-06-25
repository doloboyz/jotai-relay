/**
 * @generated SignedSource<<b90c328b02d996e6469a2863e080b79f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type appCountriesQuery$variables = Record<PropertyKey, never>;
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
    "alias": null,
    "args": null,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "appCountriesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "appCountriesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "39bf5296bf432e3d289927c468a16680",
    "id": null,
    "metadata": {},
    "name": "appCountriesQuery",
    "operationKind": "query",
    "text": "query appCountriesQuery {\n  countries {\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "147337798a788253332e76e4954b0c44";

export default node;
