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

var path = require('path'),
    fs = require('fs'),
    shell = require('shelljs');

module.exports = {

    projectDir: function() {
        var projectDir = process.cwd();

        return projectDir;
    },

    dotDir: function(){
        var projectDir = process.cwd();
            dotDir = path.join(projectDir, ".pushpath");

        if (fs.existsSync(dotDir)) {
            return dotDir;
        }

        return false;
    },

    rootDir: function() {
        var rootDir = path.resolve(__dirname + '/../../');

        return rootDir;
    },

    setupProject: function() {
        var rootDir = this.rootDir(),
            projectDir = this.projectDir();

        shell.mkdir('-p', path.join(projectDir, '.pushpath'));
        shell.cp('-f', path.join(rootDir, '/templates/', 'pushpath.json'), path.join(projectDir, '.pushpath/'));
        shell.cp('-f', path.join(rootDir, '/templates/', 'Vagrantfile'), path.join(projectDir, '.pushpath/'))
    }
};