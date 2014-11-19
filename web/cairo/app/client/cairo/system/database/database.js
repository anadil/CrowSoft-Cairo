(function() {
  "use strict";

///////////////
  // Entities
  ///////////////

  Cairo.module("Entities", function(Entities, Cairo, Backbone, Marionette, $, _) {

    Entities.DatabaseQuery = Backbone.Model.extend({ });

  });

  Cairo.Database = {

    getAPIVersion: function() {
      return "/api/v1/";
    },

    saveEx: function(register, isNew, codeField, functionName, module, title) {
      var p = null;
      if(register.getPath() === "") {
        p = Cairo.Promises.resolvedPromise({success: false, message: "Invalid query: Path not defined."});
      }
      else {
        var id = register.getId();
        var options = id !== Cairo.Constants.NO_ID ? {id: register.getId()} : {};
        var q = new Cairo.Entities.DatabaseQuery(options);
        var fields = register.getFields().asObject();
        q.urlRoot = register.getPath();
        var defer = new Cairo.Promises.Defer();
        q.save(fields, {
          wait: true,
          success: function(data) {
            Cairo.log("Successfully saved!");
            register.setId(data.get("id"));
            register.setData(data);
            defer.resolve({success: true, data: register});
          },
          error: function(data, response) {
            Cairo.log("Failed in saveEx: " + module + "." + functionName + ".");
            Cairo.log(response.responseText);
            Cairo.manageError(
              "New Tree",
              "Can't save this record. An error has occurred in the server.",
              response.responseText);
            defer.resolve({success: false, data: data, response: response});
          }
        });
        p = defer.promise;
      }
      return p;
    },

    execute: function() { /* TODO: implement this. */ },

    getData: function(query, id) {
      var getAction = function() {
        var p = query.indexOf("[");
        return p > 0 ? query.substring(0, p) : "";
      };

      var getPath = function() {
        var p1 = query.indexOf("[");
        var p2 = query.indexOf("]");
        return p1 > 0 && p2 > 1 ? query.substring(p1+1, p2) : "";
      };

      var p = null;
      var rp = Cairo.Promises.resolvedPromise;
      var action = getAction();

      if(action === "load") {
        var path = getPath();
        if(path === "") {
          p = rp({success: false, message: "Invalid query: Path not defined."});
        }
        else {
          var q = new Cairo.Entities.DatabaseQuery({id: id});
          q.urlRoot = path;
          var defer = new Cairo.Promises.Defer();
          q.fetch({
            success: function(data) {
              defer.resolve({success: true, data: data});
            },
            error: function(data, response) {
              if(response.status === 401) {
                Cairo.infoViewShow("Unauthorized", "The server has denied access to this action.")
              }
              else if(response.status === 500) {
                Cairo.manageError(
                  "Server Request [Get Data]",
                  "Can't get data for query:[ " + query + " id: " + id.toString() + " ]. An error has occurred in the server.",
                  response.responseText);
              }
              defer.resolve({success: false, data: data, response: response});
            }
          });
          p = defer.promise;
        }
      }
      else if(action === "") {
        p = rp({success: false, message: "Invalid query: Action not defined."});
      }
      else {
        p = rp({success: false, message: "Invalid query: Action [" + action + "] not supported."});
      }
      return p;
    },

    valField: function(fields, fieldName) {
      return fields.get(fieldName);
    },

    Register: function() {
      var _fieldId, _table, _id;
      var __fields = [];
      var _data = null;
      var _path = "";

      var _fields = {
        add: function(name, value, type) {
          __fields.push({name: name, value: value, type: type});
        },
        asObject: function() {
          var getValue = function(value, type) {
            switch(type) {
              case Cairo.Constants.Types.boolean:
                value = value ? true : false;
              case Cairo.Constants.Types.text:
                value = value.toString();
            }
            return value;
          };
          var obj = {};
          for(var i = 0; i < __fields.length; i += 1) {
            obj[__fields[i].name] = getValue(__fields[i].value, __fields[i].type);
          }
          return obj;
        }
      };

      this.getFields = function() {
        return _fields;
      };

      this.setFieldId = function(fieldId) {
        _fieldId = fieldId;
      };

      this.setTable = function(table) {
        _table = table;
      };

      this.setId = function(id) {
        _id = id;
      };
      this.getId = function() {
        return _id;
      };

      this.setPath = function(path) {
        _path = path;
      };
      this.getPath = function() {
        return _path;
      };

      this.setData = function(data) {
        _data = data;
      }
      this.getData = function() {
        return _data;
      }

      return this;
    }

  };

}());