/**
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const {Transformer} = require('@parcel/plugin');

module.exports = new Transformer({
  async transform({asset}) {
    let contents = await asset.getBuffer();

    asset.type = 'js';
    asset.setCode(`import { base64ToBuffer, CustomType } from 'parcel-transformer-custom-type/helpers';
export default new CustomType(base64ToBuffer(${JSON.stringify(contents.toString('base64'))}));
`);

    return [asset];
  }
});