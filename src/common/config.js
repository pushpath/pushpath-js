/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

var fs = require('fs'),
    path = require('path');

var core = requirejs('pushpath/core');

var CONFIG_FILENAME = 'pushpath.json';

var config_module = {
    path: function() {
        var config_file = path.join(core.dotDir(), CONFIG_FILENAME);

        if (fs.existsSync(config_file)) {
            return config_file;
        }
        return false;
    },

    read: function() {
        var config_file = path.join(core.dotDir(), CONFIG_FILENAME);
        var data = fs.readFileSync(config_file);

        if (data) {
            return JSON.parse(data);
        }

        return false;
    },

    write: function(data) {
        var config_file = path.join(core.dotDir(), CONFIG_FILENAME);

        fs.writeFileSync(config_file, JSON.stringify(data, null, 4));
    },

    update: function(data) {
        var config_file = path.join(core.dotDir(), CONFIG_FILENAME),
            config_data = JSON.parse(fs.readFileSync(config_file));

        var merged_data = JSON.parse((JSON.stringify(config_data) + JSON.stringify(data)).replace(/}{/g,","));

        fs.writeFileSync(config_file, JSON.stringify(merged_data, null, 4));
    }
};

module.exports = config_module;