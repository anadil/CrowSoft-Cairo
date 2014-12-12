(function() {
  "use strict";

  Cairo.module("Camion.Edit", function(Edit, Cairo, Backbone, Marionette, $, _) {

    var createObject = function() {

      var self = {};

      var Dialogs = Cairo.Dialogs;

      // cCamion
      // 12-06-03

      var C_MODULE = "cCamion";

      var K_CODE = 1;
      var K_DESCRIP = 2;
      var K_PATENTE = 3;
      var K_PATENTESEMI = 4;
      var K_TARA = 5;
      var K_TRANS_ID = 6;
      var K_CHOF_ID = 7;
      var K_ACTIVE = 8;
      var K_ESSEMI = 9;

      var m_id = 0;
      var m_code = "";
      var m_descrip = "";
      var m_patente = "";
      var m_patentesemi = "";
      var m_tara = 0;
      var m_active;
      var m_esSemi;
      var m_trans_id = 0;
      var m_transporte = "";
      var m_chof_id = 0;
      var m_chofer = "";

      //OJO HASTA ACA

      var m_editing;

      var m_dialog;
      var m_listController = null;

      var m_isNew;

      var m_branchId = 0;
      var m_treeId = 0;

      var m_copy;

      // Properties publicas

      self.getId = function() {
        return m_id;
      };

      self.getName = function() {
        return m_code;
      };

      self.getCode = function() {
        return m_code;
      };

      // Properties privadas

      self.copy = function() {

        updateList();

        m_isNew = true;

        m_listController.updateEditorKey(self, Cairo.Constants.NO_ID);

        var property = m_dialog.getProperties().item(Cairo.General.Constants.CAM_CODE);
        property.setValue(Cairo.Constants.COPY_OF + property.getValue());

        m_dialog.showValue(m_dialog.getProperties().item(Cairo.General.Constants.CAM_CODE));

        m_copy = true;
      };

      self.editNew = function() {

        updateList();

        m_isNew = true;

        m_listController.updateEditorKey(self, Cairo.Constants.NO_ID);

        return load(Cairo.Constants.NO_ID).then(
          function(ignored) {
            return refreshCollection();
          }
        );
      };

      self.getApplication = function() {
        return Cairo.appName;
      };

      self.editDocumentsEnabled = function() {
        return m_id !== Cairo.Constants.NO_ID;
      };

      self.copyEnabled = function() {
        return true;
      };

      self.addEnabled = function() {
        return true;
      };

      self.showDocDigital = function() {
        var _rtn = null;
        try {

          if(m_id === Cairo.Constants.NO_ID) { return _rtn; }

          var doc = new Cairo.DocDigital();

          doc.setClientTable(Cairo.General.Constants.CAMION);
          doc.setClientTableID(m_id);

          _rtn = doc.showDocs(Cairo.Database);

        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, Cairo.Constants.SHOW_DOCUMENTS_FUNCTION, C_MODULE, "");
        }
              
        return _rtn;
      };

      self.messageEx = function(messageID,  info) {
        var _rtn = null;
        switch (messageID) {

          case Dialogs.Message.MSG_DOC_INFO:

            Cairo.Documentation.show("", "", csGeneralPrestacion.Cairo.Security.Actions.General.NEW_CAMION);
            _rtn = Dialogs.Message.MSG_DOC_INFO_HANDLED;
            break;

          default:
            _rtn = true;
            break;
        }
      
        return Cairo.Promises.resolvedPromise(_rtn);
      };

      self.discardChanges = function() {
        return Cairo.Promises.resolvedPromise(refreshCollection());
      };

      self.propertyChange = function(key) {
        var iProp = null;
        switch (key) {
          case K_ESSEMI:
            var properties = m_dialog.getProperties();
            iProp = properties.item(Cairo.General.Constants.CAM_PATENTESEMI);
            iProp.setEnabled(Cairo.Util.val(properties.item(Cairo.General.Constants.CAM_ES_SEMI).getValue()) === 0);
            m_dialog.showValue(iProp);
            break;
        }
      };

      self.save = function() {

        var register = new Cairo.Database.Register();
        var fields = register.getFields();

        register.setFieldId(Cairo.General.Constants.CAM_ID);
        register.setTable(Cairo.General.Constants.CAMION);

        var apiPath = Cairo.Database.getAPIVersion();
        register.setPath(apiPath + "general/camion");

        if(m_copy) {
          register.setId(Cairo.Constants.NEW_ID);
        } 
        else {
          register.setId(m_id);
        }

        var _count = m_dialog.getProperties().size();
        for (var _i = 0; _i < _count; _i++) {
          var property = m_dialog.getProperties().item(_i);
          switch (property.getKey()) {
            case K_CODE:
              fields.add(Cairo.General.Constants.CAM_CODE, property.getValue(), Cairo.Constants.Types.text);
              break;

            case K_DESCRIP:
              fields.add(Cairo.General.Constants.CAM_DESCRIP, property.getValue(), Cairo.Constants.Types.text);
              break;

            case K_PATENTE:
              fields.add(Cairo.General.Constants.CAM_PATENTE, property.getValue(), Cairo.Constants.Types.text);
              break;

            case K_PATENTESEMI:
              fields.add(Cairo.General.Constants.CAM_PATENTESEMI, property.getValue(), Cairo.Constants.Types.text);
              break;

            case K_TARA:
              fields.add(Cairo.General.Constants.CAM_TARA, property.getValue(), Cairo.Constants.Types.long);
              break;

            case K_ACTIVE:
              fields.add(Cairo.Constants.ACTIVE, Cairo.Util.val(property.getValue()), Cairo.Constants.Types.boolean);
              break;

            case K_ESSEMI:
              fields.add(Cairo.General.Constants.CAM_ES_SEMI, Cairo.Util.val(property.getValue()), Cairo.Constants.Types.boolean);
              break;

            case K_TRANS_ID:
              fields.add(Cairo.General.Constants.TRANS_ID, property.getSelectId(), Cairo.Constants.Types.id);
              break;

            case K_CHOF_ID:
              fields.add(Cairo.General.Constants.CHOF_ID, property.getSelectId(), Cairo.Constants.Types.id);
              break;
          }
        }

        return Cairo.Database.saveEx(
            register,
            false,
            Cairo.General.Constants.CAM_CODE, 
            Cairo.Constants.CLIENT_SAVE_FUNCTION,
            C_MODULE,
            Cairo.Language.getText(1045, "")).then(

          function(result) {
            if(result.success) {
                m_copy = false;
              return load(result.data.getId()).then(
                function (success) {
                  if(success) {
                    updateList();
                    m_listController.updateEditorKey(self, m_id);
                  };
                  m_isNew = false;
                  return success;
                }
              );
            }
            else {
              return false;
            }
        });
      };

      var updateList = function() {
        if(m_id === Cairo.Constants.NO_ID) { return; }
        if(m_listController === null) { return; }

        if(m_isNew) {
          m_listController.addLeave(m_id, m_branchId);
        }
        else {
          m_listController.refreshBranch(m_id, m_branchId);
        }
      };

      self.terminate = function() {

        m_editing = false;

        try {
          if(m_listController !== null) {
            updateList();
            m_listController.removeEditor(self);
          }
        }
        catch (ignored) {
          Cairo.logError('Error in terminate', ignored);
        }
      };

      self.getPath = function() {
        return "#general/camion/" + m_id.toString();
      };

      self.getEditorName = function() {
        var id = m_id ? m_id.toString() : "N" + (new Date).getTime().toString();
        return "camion" + id;
      };

      self.getTitle = function() {
        // Camiones
        return Cairo.Language.getText(1046, "");
      };

      self.validate = function() {
        var iPropiedad = null;

        var _count = m_dialog.getProperties().size();
        for (var _i = 0; _i < _count; _i++) {
          iPropiedad = m_dialog.getProperties().item(_i);
          switch (iPropiedad.getKey()) {
            case K_CODE:
              if(Cairo.Util.valEmpty(iPropiedad.getValue(), Cairo.Constants.Types.text)) {
                iPropiedad.setValue(Cairo.Constants.GET_CODE_FROM_ID);
              }
              break;
          }
        }

        return Cairo.Promises.resolvedPromise(true);
      };

      self.getDialog = function() {
        return m_dialog;
      };

      self.setTreeId = function(rhs) {
        m_treeId = rhs;
      };

      self.getTreeId = function() {
        return m_treeId;
      };

      self.list = function() {
        return Cairo.Security.hasPermissionTo(csGeneralPrestacion.Cairo.Security.Actions.General.LIST_CAMION);
      };

      self.setDialog = function(rhs) {
        m_dialog = rhs;
      };

      self.isEditing = function() {
        return m_editing;
      };

      self.edit = function(id,  inModalWindow) {
        var p = Cairo.Promises.resolvedPromise(false);
        try {

          if(id === Cairo.Constants.NO_ID) {
            m_isNew = true;
            if(!Cairo.Security.hasPermissionTo(csGeneralPrestacion.Cairo.Security.Actions.General.NEW_CAMION)) { return p; }
          } 
          else {
            m_isNew = false;
            if(!Cairo.Security.hasPermissionTo(csGeneralPrestacion.Cairo.Security.Actions.General.EDIT_CAMION)) { return p; }
          }

          m_dialog.setInModalWindow(inModalWindow);

          p = load(id).then(
           function(success) {
              if(success) {

                if(!loadCollection()) { return false; }

                m_editing = true;
                m_copy = false;

                if(inModalWindow) {
                  success = m_id !== Cairo.Constants.NO_ID;
                } 
                else {
                  success = true;
                }

              }
              return success;
          });
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, Cairo.Constants.EDIT_FUNCTION, C_MODULE, "");
      }
      
        return p;
      };

      self.setTree = function(rhs) {
        m_listController = rhs;
      };

      self.setBranchId = function(rhs) {
        m_branchId = rhs;
      };

      self.getBranchId = function() {
        return m_branchId;
      };

      var loadCollection = function() {

        m_dialog.setTitle(m_code);

        var properties = m_dialog.getProperties();

        properties.clear();

        var elem = properties.add(null, Cairo.General.Constants.CAM_CODE);
        elem.setType(Dialogs.PropertyType.text);
        elem.setName(Cairo.Constants.CODE_LABEL);
        elem.setSize(10);
        elem.setKey(K_CODE);
        elem.setValue(m_code);

        var elem = properties.add(null, Cairo.Constants.ACTIVE);
        elem.setType(Dialogs.PropertyType.check);
        elem.setName(Cairo.Constants.ACTIVE_LABEL);
        elem.setKey(K_ACTIVE);
        elem.setValue(m_active === true ? 1 : 0);

        var elem = properties.add(null, Cairo.General.Constants.CAM_ES_SEMI);
        elem.setType(Dialogs.PropertyType.check);
        //'Es la Pantente del Semi
        elem.setName(Cairo.Language.getText(3492, ""));
        elem.setKey(K_ESSEMI);
        elem.setValue(Cairo.Util.boolToInt(m_esSemi));

        var elem = properties.add(null, Cairo.General.Constants.CAM_PATENTE);
        elem.setType(Dialogs.PropertyType.text);
        //'Patente
        elem.setName(Cairo.Language.getText(1047, ""));
        elem.setSize(20);
        elem.setKey(K_PATENTE);
        elem.setValue(m_patente);

        var elem = properties.add(null, Cairo.General.Constants.CAM_PATENTESEMI);
        elem.setType(Dialogs.PropertyType.text);
        //'Patente Semi
        elem.setName(Cairo.Language.getText(1048, ""));
        elem.setSize(20);
        elem.setKey(K_PATENTESEMI);
        elem.setValue(m_patentesemi);
        elem.setEnabled(Not m_esSemi);

        var elem = properties.add(null, Cairo.General.Constants.CAM_TARA);
        elem.setType(Dialogs.PropertyType.numeric);
        elem.setSubType(Dialogs.PropertySubType.Integer);
        //'Tara
        elem.setName(Cairo.Language.getText(1049, ""));
        elem.setKey(K_TARA);
        elem.setValue(m_tara);
        elem.setWidth(1300);
        elem.setTopFromProperty(Cairo.General.Constants.CAM_CODE);
        elem.setLeft(5500);

        var elem = properties.add(null, Cairo.General.Constants.TRANS_ID);
        elem.setType(Dialogs.PropertyType.select);
        elem.setSelectTable(Cairo.Tables.TRANSPORTE);
        //'Transporte
        elem.setName(Cairo.Language.getText(1050, ""));
        elem.setKey(K_TRANS_ID);
        elem.setValue(m_transporte);
        elem.setSelectId(m_trans_id);

        var elem = properties.add(null, Cairo.General.Constants.CHOF_ID);
        elem.setType(Dialogs.PropertyType.select);
        elem.setSelectTable(Cairo.Tables.CHOFER);
        //'Chofer
        elem.setName(Cairo.Language.getText(1051, ""));
        elem.setKey(K_CHOF_ID);
        elem.setValue(m_chofer);
        elem.setSelectId(m_chof_id);

        var elem = properties.add(null, Cairo.General.Constants.CAM_DESCRIP);
        elem.setType(Dialogs.PropertyType.text);
        elem.setName(Cairo.Constants.DESCRIPTION_LABEL);
        elem.setSubType(Dialogs.PropertySubType.memo);
        elem.setWidth(6250);
        elem.setHeight(660);
        elem.setSize(255);
        elem.setKey(K_DESCRIP);
        elem.setValue(m_descrip);
        elem.setLeftFromProperty(Cairo.General.Constants.CAM_CODE);
        elem.setTopFromProperty(Cairo.General.Constants.CAM_PATENTESEMI);
        elem.setTopToPrevious(440);

        if(!m_dialog.show(self)) { return false; }

        return true;
      };

      var refreshCollection = function() {

        m_dialog.setTitle(m_name);

        var properties = m_dialog.getProperties();

        var elem = properties.item(Cairo.General.Constants.CAM_CODE);
        elem.setValue(m_code);

        var elem = properties.item(Cairo.Constants.ACTIVE);
        elem.setValue(m_active === true ? 1 : 0);

        var elem = properties.item(Cairo.General.Constants.CAM_ES_SEMI);
        elem.setValue(Cairo.Util.boolToInt(m_esSemi));

        var elem = properties.item(Cairo.General.Constants.CAM_PATENTE);
        elem.setValue(m_patente);

        var elem = properties.item(Cairo.General.Constants.CAM_PATENTESEMI);
        elem.setValue(m_patentesemi);

        var elem = properties.item(Cairo.General.Constants.CAM_TARA);
        elem.setValue(m_tara);

        var elem = properties.item(Cairo.General.Constants.TRANS_ID);
        elem.setValue(m_transporte);
        elem.setSelectId(m_trans_id);

        var elem = properties.item(Cairo.General.Constants.CHOF_ID);
        elem.setValue(m_chofer);
        elem.setSelectId(m_chof_id);

        var elem = properties.item(Cairo.General.Constants.CAM_DESCRIP);
        elem.setValue(m_descrip);

        return m_dialog.showValues(properties);
      };

      var load = function(id) {

        var apiPath = Cairo.Database.getAPIVersion();
        return Cairo.Database.getData("load[" + apiPath + "general/camion]", id).then(
          function(response) {

            if(!rs.isEOF()) {

              m_id = Cairo.Database.valField(response.data, Cairo.General.Constants.CAM_ID);
              m_code = Cairo.Database.valField(response.data, Cairo.General.Constants.CAM_CODE);
              m_descrip = Cairo.Database.valField(response.data, Cairo.General.Constants.CAM_DESCRIP);
              m_patente = Cairo.Database.valField(response.data, Cairo.General.Constants.CAM_PATENTE);
              m_patentesemi = Cairo.Database.valField(response.data, Cairo.General.Constants.CAM_PATENTESEMI);
              m_tara = Cairo.Database.valField(response.data, Cairo.General.Constants.CAM_TARA);
              m_active = Cairo.Database.valField(response.data, Cairo.Constants.ACTIVE);
              m_esSemi = Cairo.Database.valField(response.data, Cairo.General.Constants.CAM_ES_SEMI);
              m_transporte = Cairo.Database.valField(response.data, Cairo.General.Constants.TRANS_NAME);
              m_chofer = Cairo.Database.valField(response.data, Cairo.General.Constants.CHOF_NAME);
              m_trans_id = Cairo.Database.valField(response.data, Cairo.General.Constants.TRANS_ID);
              m_chof_id = Cairo.Database.valField(response.data, Cairo.General.Constants.CHOF_ID);

            } 
            else {
              m_id = Cairo.Constants.NO_ID;
              m_code = "";
              m_descrip = "";
              m_patente = "";
              m_patentesemi = "";
              m_tara = 0;
              m_esSemi = false;
              m_active = true;
              m_trans_id = Cairo.Constants.NO_ID;
              m_chof_id = Cairo.Constants.NO_ID;
              m_transporte = "";
              m_chofer = "";

            }

          return true;
        });

      };

      self.destroy = function() {
        m_dialog = null;
        m_listController = null;
      };

      return self;
    };

    Edit.Controller = { getEditor: createObject };

  });

  Cairo.module("Camion.List", function(List, Cairo, Backbone, Marionette, $, _) {
    List.Controller = {
      list: function() {

        var self = this;

        /*
         this function will be called by the tab manager every time the
         view must be created. when the tab is not visible the tab manager
         will not call this function but only make the tab visible
         */
        var createTreeDialog = function(tabId) {

          var editors = Cairo.Editors.camionEditors || Cairo.Collections.createCollection(null);
          Cairo.Editors.camionEditors = editors;

          // ListController properties and methods
          //
          self.entityInfo = new Backbone.Model({
            entitiesTitle: "Camiones",
            entityName: "camion",
            entitiesName: "camiones"
          });

          self.showBranch = function(branchId) {
            Cairo.log("Loading nodeId: " + branchId);
            Cairo.Tree.List.Controller.listBranch(branchId, Cairo.Tree.List.Controller.showItems, self);
          };

          self.addLeave = function(id, branchId) {
            try {
              Cairo.Tree.List.Controller.addLeave(branchId, id, self);
            }
            catch(ignore) {
              Cairo.log("Error when adding this item to the branch\n\n" + ignore.message);
            }
          };

          self.refreshBranch = function(id, branchId) {
            try {
              Cairo.Tree.List.Controller.refreshBranchIfActive(branchId, id, self);
            }
            catch(ignore) {
              Cairo.log("Error when refreshing a branch\n\n" + ignore.message);
            }
          };

          var getIndexFromEditor = function(editor) {
            var count = editors.count();
            for(var i = 0; i < count; i += 1) {
              if(editors.item(i).editor === editor) {
                return i;
              }
            }
            return -1;
          };

          self.removeEditor = function(editor) {
            var index = getIndexFromEditor(editor);
            if(index >= 0) {
              editors.remove(index);
            }
          };

          var getKey = function(id) {
            if(id === Cairo.Constants.NO_ID) {
              return "new-id:" + (new Date).getTime().toString()
            }
            else {
              return "k:" + id.toString();
            }
          };

          self.updateEditorKey = function(editor, newId) {
            var index = getIndexFromEditor(editor);
            if(index >= 0) {
              var editor = editors.item(index);
              editors.remove(index);
              var key = getKey(newId);
              editors.add(editor, key);
            }
          };

          self.edit = function(id, treeId, branchId) {
            var key = getKey(id);
            if(editors.contains(key)) {
              editors.item(key).dialog.showDialog();
            }
            else {
              var editor = Cairo.Camion.Edit.Controller.getEditor();
              var dialog = Cairo.Dialogs.Views.Controller.newDialog();

              editor.setTree(self);
              editor.setDialog(dialog);
              editor.setTreeId(treeId);
              editor.setBranchId(branchId);
              editor.edit(id);

              editors.add({editor: editor, dialog: dialog}, key);
            }
          };

          self.destroy = function(id, treeId, branchId) {
            if(!Cairo.Security.hasPermissionTo(Cairo.Security.Actions.General.DELETE_CAMION)) {
              return Cairo.Promises.resolvedPromise(false);
            }
            var apiPath = Cairo.Database.getAPIVersion();
            return Cairo.Database.destroy(apiPath + "general/camion", id, Cairo.Constants.DELETE_FUNCTION, "Camion").success(
              function() {
                try {
                  var key = getKey(id);
                  if(editors.contains(key)) {
                    editors.item(key).dialog.closeDialog();
                  }
                }
                catch(ignore) {
                  Cairo.log('Error closing dialog after delete');
                }
                return true;
              }
            );
          };

          // progress message
          //
          Cairo.LoadingMessage.show("Camiones", "Loading Camiones from CrowSoft Cairo server.");

          // create the tree region
          //
          Cairo.addRegions({ camionTreeRegion: tabId });

          // create the dialog
          //
          Cairo.Tree.List.Controller.list(
            Cairo.Tables.CAMION,
            new Cairo.Tree.List.TreeLayout({ model: self.entityInfo }),
            Cairo.camionTreeRegion,
            self);

        };

        var showTreeDialog = function() {
          Cairo.Tree.List.Controller.showTreeDialog(self);
        };

        var closeTreeDialog = function() {

        }

        // create the tab
        //
        Cairo.mainTab.showTab("Camiones", "camionTreeRegion", "#general/camiones", createTreeDialog, closeTreeDialog, showTreeDialog);

      }
    };
  });


}());