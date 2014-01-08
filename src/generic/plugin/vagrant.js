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

var exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path');

var core = requirejs('pushpath/core');

var VAGRANTFILE = 'Vagrantfile';

var vagrant = {
    init: function() {
        var cmd = 'vagrant init';

        this.exec(cmd);
    },
    up: function() {
        var cmd = 'vagrant up';

        this.exec(cmd);
    },
    destroy: function(){
        var cmd = 'vagrant destroy -f';

        this.exec(cmd);
    },
    halt: function(){
        var cmd = 'vagrant halt';

        this.exec(cmd);
    },
    provision: function(){
        var cmd = 'vagrant provision';

        this.exec(cmd);
    },
    resume: function(){
        var cmd = 'vagrant resume';

        this.exec(cmd);
    },
    suspend: function(){
        var cmd = 'vagrant suspend';

        this.exec(cmd);
    },
    exec: function(cmd) {
        if (cmd) {
            var result = exec(cmd, {silent: true});
            if (result) {
                return result;
            }
        }
        return false;
    },
    readTemplate: function() {
        var dotDir = core.dotDir();
        var templateFullPath = path.join(dotDir, VAGRANTFILE);

        var data = fs.readFileSync(templateFullPath);

        return data;
    },
    applyConfig: function() {
        var projectDir = core.projectDir();

        var vagrantfileTemplateData = this.readTemplate();
        var config = requirejs('pushpath/config').read();

        var dotjs = require('dot');
        dotjs.templateSettings['varname'] = 'tpl';
        dotjs.templateSettings['strip'] = false;
        var dotFunc = dotjs.template(vagrantfileTemplateData);

        var vagrantfileData = dotFunc({
            config_vm_box: config.plugins.vagrant.config['config_vm_box'],
            config_vm_box_url: config.plugins.vagrant.config['config_vm_box_url'],

            network_type: config.plugins.vagrant.config['network']['network_type'],
            network_ip: config.plugins.vagrant.config['network']['network_ip'],

            provider_type: config.plugins.vagrant.config['provider']['type'],
            provider_name: config.plugins.vagrant.config['provider']['name']
        });

        var File = requirejs('pushpath/plugin/file');
        var FileWriter = new File(VAGRANTFILE, projectDir);

        FileWriter.write(vagrantfileData);
    },
    status: function() {
        var cmd = 'vagrant status',
            strSeparator = '\n\n',
            statusIdx = 1;

        var result = this.exec(cmd);
        if (result) {
            var status;

            status = result.output.split(strSeparator);
            status = status[statusIdx].replace(/ +(?= )/g,'');

            if (status) {
                return status;
            }
        }
        return false;
    }
};

module.exports = vagrant;