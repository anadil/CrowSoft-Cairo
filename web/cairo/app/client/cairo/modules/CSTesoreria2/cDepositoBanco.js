(function() {
  "use strict";

  Cairo.module("DepositoBanco.Edit", function(Edit, Cairo, Backbone, Marionette, $, _) {

    var createObject = function() {

      var self = {};

      var getText = Cairo.Language.getText;

      var TITLE = getText(2164, ""); // Deposito Bancarios
      var SAVE_ERROR_MESSAGE = getText(2236, ""); // Error al grabar el deposito bancario

      var P = Cairo.Promises;
      var NO_ID = Cairo.Constants.NO_ID;
      var DB = Cairo.Database;
      var Dialogs = Cairo.Dialogs;
      var Grids = Cairo.Dialogs.Grids;
      var C = Cairo.General.Constants;
      var CT = Cairo.Tesoreria.Constants;
      var CC = Cairo.Compras.Constants;
      var CS = Cairo.Security.Actions.Tesoreria;
      var Types = Cairo.Constants.Types;
      var valField = DB.valField;
      var getValue = DB.getValue;
      var valEmpty = Cairo.Util.valEmpty;
      var call = P.call;
      var D = Cairo.Documents;
      var getProperty = D.getProperty;
      var getGrid = D.getGrid;
      var getCell = Dialogs.cell;
      var cellVal = Dialogs.cellVal;
      var cellId = Dialogs.cellId;
      var cellFloat = Dialogs.cellFloat;
      var val = Cairo.Util.val;
      var M = Cairo.Modal;
      var T = Dialogs.PropertyType;

      var C_MODULE = "cDepositoBanco";

      var C_EFECTIVO = "Efectivo";
      var C_CHEQUES = "Cheques";
      var C_CHEQUEST = "Cheques En Cartera";

      var C_CHEQUERA = "Chequera";
      var C_COLCHEQUE = "cheque";

      var C_ITEMS = "ITEMS";

      var K_NUMERO = 1;
      var K_NRODOC = 2;
      var K_DESCRIP = 3;
      var K_FECHA = 4;
      var K_TOTAL = 9;
      var K_BCO_ID = 10;
      var K_DOC_ID = 11;
      var K_DOCT_ID = 12;

      var K_EFECTIVO = 105;
      var K_CHEQUES = 106;
      var K_CHEQUEST = 107;

      var K_EST_ID = 17;
      var K_SUC_ID = 19;
      var K_LGJ_ID = 27;
      var K_COTIZACION = 28;
      var K_CUE_ID = 29;

      var KI_DBCOI_ID = 2;
      var KI_ORDEN = 3;
      var KI_DESCRIP = 6;
      var KI_IMPORTE = 8;
      var KI_IMPORTE_ORIGEN = 9;
      var KI_CUE_ID = 22;
      var KI_CHEQ_ID = 23;
      var KI_BCO_ID = 24;
      var KI_CHEQ_ID_SAVED = 25;

      var KI_CUE_ID_HABER = 301;

      var KICH_IMPORTE = 3;
      var KICH_IMPORTEORIGEN = 4;
      var KICH_CHEQUERA = 5;
      var KICH_CHEQUE = 6;
      var KICH_CHEQ_ID = 7;
      var KICH_MON_ID = 8;
      var KICH_FECHACOBRO = 10;
      var KICH_FECHAVTO = 11;
      var KICH_CLE_ID = 12;
      var KICH_DESCRIP = 13;

      var m_id = 0;
      var m_numero = 0;
      var m_estado = "";
      var m_estId = 0;
      var m_nrodoc = "";
      var m_descrip = "";
      var m_fecha = null;
      var m_total = 0;
      var m_lgjId = 0;
      var m_legajo = "";

      var m_cotizacion = 0;
      var m_sucId = 0;
      var m_sucursal = "";
      var m_bcoId = 0;
      var m_banco = "";
      var m_cueId = 0;
      var m_cuenta = "";
      var m_docId = 0;
      var m_documento = "";
      var m_doctId = 0;
      var m_monId = 0;
      var m_lastMonIdCotizacion = 0;
      var m_creado = null;
      var m_modificado = null;
      var m_modifico = 0;
      var m_firmado;

      var m_asId = 0;

      var m_editing;

      var m_footer;
      var m_items;
      var m_dialog;
      var m_listController = null;

      var m_lastDocId = 0;
      var m_lastDocName = "";

      var m_lastDoctId = 0;

      var m_lastBcoId = 0;
      var m_lastBcoName = "";

      var m_lastCueId = 0;
      var m_lastCueName = "";

      var m_isNew;

      var m_copy;

      var m_docEditable;
      var m_docEditMsg = "";

      var m_taPropuesto;
      var m_taMascara = "";

      var m_monDefault = 0;

      var m_efectivoDeleted = "";
      var m_chequesDeleted = "";
      var m_tChequesDeleted = "";

      var m_orden = 0;

      var m_apiPath = DB.getAPIVersion();

      var emptyData = {
        cheques: [],
        chequesT: [],
        otros: [],
        efectivo: [],
        tarjetas: [],
        ctaCte: []
      };

      var m_data = emptyData;

      self.getEditorType = function() {
        return "document"
      };

      self.refresh = function() {
        load(m_id);
        refreshProperties();
      };

      var initMembers = function() {

        if(!Cairo.Security.docHasPermissionTo(
          CS.NEW_DEPOSITO_BANCO,
          NO_ID,
          Cairo.Security.ActionTypes.create)) {
          return false;
        }

        self.setDialog(Cairo.Dialogs.Views.Controller.newDialog());
        self.setFooter(Cairo.Dialogs.Views.Controller.newDialog());
        self.setItems(Cairo.Dialogs.Views.Controller.newDialog());

        return true;
      };

      self.copy = function() {

        if(!Cairo.Security.docHasPermissionTo(
          CS.NEW_DEPOSITO_BANCO,
          m_docId,
          Cairo.Security.ActionTypes.create,
          true)) {
          return false;
        }

        updateList();

        m_isNew = true;

        if(m_listController !== null) {
          m_listController.updateEditorKey(self, NO_ID);
        }

        m_copy = true;
        m_docEditable = true;
        m_docEditMsg = "";

        D.setDocNumber(m_lastDocId, m_dialog, CT.DBCO_NRODOC).then(
          function(enabled) {
            m_taPropuesto = enabled;
            setEnabled();
          }
        );
      };

      self.editNew = function() {

        var p;

        updateList();

        m_isNew = true;

        if(m_listController !== null) {
          m_listController.updateEditorKey(self, NO_ID);
        }

        p = self.edit(NO_ID).then(function() {

          var p = null;

          if(!m_docEditable && getDocId().getSelectId() !== NO_ID) {
            if(m_docEditMsg !== "") {
              p = M.showWarning(m_docEditMsg);
            }
          }

          return p || P.resolvedPromise();

        }).then(function() {

            var p = null;

            var docId = getDocId().getSelectId();

            if(docId === NO_ID) {
              p = M.showInfo(getText(1562, ""));
            }

            return p || P.resolvedPromise();

          }).then(function() {

            return D.setDocNumber(m_lastDocId, m_dialog, CC.AS_NRODOC)

          }).then(function(enabled) {

            m_taPropuesto = enabled;
            return true;

          });

        return p;
      };

      self.getApplication = function() {
        return Cairo.Application.getName();
      };

      self.editDocumentsEnabled = function() {
        return m_id !== NO_ID;
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

          if(m_id === NO_ID) { return _rtn; }

          var doc = new Cairo.DocDigital();

          doc.setClientTable(CC.DEPOSITO_BANCO);
          doc.setClientTableID(m_id);

          _rtn = doc.showDocs(Cairo.Database);

        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "showDocDigital", C_MODULE, "");
        }

        return _rtn;
      };

      self.messageEx = function(messageID,  info) {
        var p = null;

        switch (messageID) {
          case Dialogs.Message.MSG_DOC_FIRST:
          case Dialogs.Message.MSG_DOC_PREVIOUS:
          case Dialogs.Message.MSG_DOC_NEXT:
          case Dialogs.Message.MSG_DOC_LAST:

            p = move(messageID);
            break;

          case Dialogs.Message.MSG_DOC_SIGNATURE:

            p = signDocument();
            break;

          case Dialogs.Message.MSG_GRID_ROW_DELETED:

            p = true;
            showTotales();
            break;

          case Dialogs.Message.MSG_DOC_EDIT_STATE:

            D.showEditStatus(m_docEditMsg, TITLE);
            break;

          case Dialogs.Message.MSG_DOC_DELETE:

            p = self.deleteDocument(m_id).success(function() {
              return move(Dialogs.Message.MSG_DOC_NEXT);
            });
            break;

          case Dialogs.Message.MSG_DOC_INVALIDATE:

            p = D.docInvalidate(m_doctId, m_id, m_dialog).then(function(result) {
              if(result.success === true) {
                m_estId = result.estId;
                m_estado = result.estado;
                m_docEditable = result.editable;
                m_docEditMsg = result.message;
                setEnabled();
              }
            });
            break;

          case Dialogs.Message.MSG_DOC_REFRESH:

            p = load(m_id).then(function(success) {
              if(success === true) {
                refreshProperties();
              }
            });
            break;

          case Dialogs.Message.MSG_DOC_EX_GET_ITEMS:

            p = P.resolvedPromise(m_items);
            break;

          case Dialogs.Message.MSG_DOC_EX_GET_FOOTERS:

            p = P.resolvedPromise(m_footer);
            break;

          case Dialogs.Message.MSG_DOC_SEARCH                    :

            D.search(D.Types.DEPOSITO_BANCO, self, Cairo.bool(info));
            break;

          case Dialogs.Message.MSG_DOC_DOC_AUX:

            if(m_id) {
              D.showDocAux(m_asId, "Asiento");
            }
            else {
              return M.showInfoWithFalse(getText(1620, "")); // Debe editar un comprobante guardado para poder ver los documentos auxiliares
            }
            break;

            if(m_id) {
              D.showDocAux(m_asId, "Asiento");
            }
            else {
              return M.showInfoWithFalse(getText(1620, "")); // Debe editar un comprobante guardado para poder ver los documentos auxiliares
            }
            break;

          case Dialogs.Message.MSG_DOC_HISTORY:

            if(m_id !== NO_ID) {
              p = Cairo.History.show(Cairo.Tables.ORDENES_DE_PAGO, m_id, m_documento + " " + m_nrodoc);
            }
            else {
              p = M.showInfo(getText(1552, "")); // El documento aun no ha sido guardado
            }
            break;
        }

        return p || P.resolvedPromise();
      };

      self.discardChanges = function() {
        Cairo.raiseError("DepositoBanco", "DiscardChanges was called");
      };

      self.propertyChange = function(key) {

        var p = null;

        switch (key) {

          case K_DOC_ID:

            // if the document has changed
            //
            var changeInfo = D.docHasChanged(m_dialog, m_lastDocId);
            if(changeInfo.changed) {

              m_lastDocId = changeInfo.docId;
              m_lastDocName = changeInfo.docName;

              p = DB.getData("load[" + m_apiPath + "documento/" + m_lastDocId.toString() + "/info]");

              p = p.then(function(response) {

                if(response.success === true) {
                  m_lastDoctId = valField(response.data, C.DOCT_ID);
                }
                return response.success;

              })
                .whenSuccess(function() {

                  var p = null;

                  // when the document property is changed and the dialog was
                  // editing a saved invoice we need to move to a new document
                  //
                  if(m_id !== NO_ID && m_docId !== m_lastDocId) {
                    p = self.edit(D.Constants.DOC_CHANGED);
                  }

                  return p || P.resolvedPromise(true);

                })
                .whenSuccess(function() {

                  return D.setDocNumber(m_lastDocId, m_dialog, CC.DBCO_NRODOC)
                    .then(function(enabled) {

                      m_taPropuesto = enabled;
                    });
                });
            }

            p = p || P.resolvedPromise();

            p.then(function() {
              setEnabled();
            });

            break;

          case K_BCO_ID:

            getFilterCuenta(getBanco().getSelectId())
              .whenSuccessWithResult(function(result) {

                var prop = getCuenta();
                prop.setSelectFilter(result.filter);
                m_dialog.showValue(prop);
                m_dialog.validateProp(prop, C.CUE_ID)
            });
            break;

          case K_CUE_ID:

            showBanco();
            showCotizacion();
            break;

          case K_FECHA:

            m_lastMonIdCotizacion = NO_ID;
            showCotizacion();
            break;
        }
      };

      self.save = function() {

        var p;

        var cotizacion = 0;
        var totalOrigen = 0;
        var isDefaultCurrency = false;
        var total = 0;

        p = D.docCanBeEdited(m_docEditable, m_docEditMsg)
          .whenSuccess(function() {
            return D.docCanBeSaved(m_dialog, CC.DBCO_FECHA);
          })

        // Save and State
        //
        if(!DocCanEdit(m_docEditable, m_docEditMsg)) {
          _rtn = true;
          return _rtn;
        }
        if(!DocCanSave(m_dialog, mTesoreriaConstantes.DBCO_FECHA)) {
          _rtn = false;
          return _rtn;
        }

        // OJO -tsr
        if(pGetCheques().getRows().count() === 0 && pGetTCheques().getRows().count() === 0 && pGetEfectivo().getRows().count() === 0) {
          //'El documento debe contener al menos un item
          MsgWarning(Cairo.Language.getText(3903, ""));
          _rtn = false;
          return _rtn;
        }

        var mouse = null;
        mouse = new cMouseWait();

        DoEvents:(DoEvents: DoEvents: DoEvents);

        var register = new Cairo.Database.Register();
        register.setFieldId(mTesoreriaConstantes.DBCO_TMPID);
        register.setTable(mTesoreriaConstantes.DEPOSITOBANCOTMP);

        register.setId(Cairo.Constants.NEW_ID);

        var apiPath = Cairo.Database.getAPIVersion();
        register.setPath(apiPath + "general/depositobanco");

        if(m_copy) {
          register.getFields().add2(mTesoreriaConstantes.DBCO_ID, Cairo.Constants.NEW_ID, Cairo.Constants.Types.long);
        }
        else {
          register.getFields().add2(mTesoreriaConstantes.DBCO_ID, m_id, Cairo.Constants.Types.long);
        }

        if(register.getID() === Cairo.Constants.NEW_ID) {
          m_estId = CSGeneralEx2.csEEstado.cSEEST_PENDIENTE;
        }

        var _count = m_dialog.getProperties().size();
        for (var _i = 0; _i < _count; _i++) {
          var property = m_dialog.getProperties().item(_i);
          switch (property.getKey()) {
            case K_NUMERO:
              register.getFields().add2(mTesoreriaConstantes.DBCO_NUMERO, property.getValue(), Cairo.Constants.Types.long);
              break;

            case K_NRODOC:
              register.getFields().add2(mTesoreriaConstantes.DBCO_NRODOC, property.getValue(), Cairo.Constants.Types.text);
              break;

            case K_DESCRIP:
              register.getFields().add2(mTesoreriaConstantes.DBCO_DESCRIP, property.getValue(), Cairo.Constants.Types.text);
              break;

            case K_FECHA:
              register.getFields().add2(mTesoreriaConstantes.DBCO_FECHA, property.getValue(), Cairo.Constants.Types.date);
              break;

            case K_BCO_ID:
              register.getFields().add2(mTesoreriaConstantes.BCO_ID, property.getSelectId(), Cairo.Constants.Types.id);
              break;

            case K_SUC_ID:
              register.getFields().add2(mTesoreriaConstantes.SUC_ID, property.getSelectId(), Cairo.Constants.Types.id);
              break;

            case K_DOC_ID:
              register.getFields().add2(mTesoreriaConstantes.DOC_ID, property.getSelectId(), Cairo.Constants.Types.id);
              break;

            case K_CUE_ID:
              register.getFields().add2(mTesoreriaConstantes.CUE_ID, property.getSelectId(), Cairo.Constants.Types.id);
              break;

            case K_COTIZACION:
              cotizacion = property.getValue();
              register.getFields().add2(mTesoreriaConstantes.DBCO_COTIZACION, property.getValue(), Cairo.Constants.Types.double);
              break;

            case K_LGJ_ID:
              register.getFields().add2(mTesoreriaConstantes.LGJ_ID, property.getSelectId(), Cairo.Constants.Types.id);
              break;
          }
        }

        // Si la cotizacion es 0 es por que la moneda
        // del documento es la de curso legal y por tanto
        // no grabo el importe origen
        if(cotizacion === 0) {
          cotizacion = 1;
          isDefaultCurrency = true;
        }

        var _count = m_footer.getProperties().size();
        for (var _i = 0; _i < _count; _i++) {
          property = m_footer.getProperties().item(_i);
          switch (property.getKey()) {
            case K_TOTAL:
              total = property.getValue();
              break;
          }
        }

        totalOrigen = total;
        register.getFields().add2(mTesoreriaConstantes.DBCO_TOTAL, totalOrigen * cotizacion, Cairo.Constants.Types.currency);
        register.getFields().add2(mTesoreriaConstantes.DBCO_GRABARASIENTO, 1, Cairo.Constants.Types.boolean);
        register.getFields().add2(Cairo.Constants.EST_ID, m_estId, Cairo.Constants.Types.id);

        if(isDefaultCurrency) {
          register.getFields().add2(mTesoreriaConstantes.DBCO_TOTALORIGEN, 0, Cairo.Constants.Types.currency);
        }
        else {
          register.getFields().add2(mTesoreriaConstantes.DBCO_TOTALORIGEN, totalOrigen, Cairo.Constants.Types.currency);
        }

        register.getFields().setHaveLastUpdate(true);
        register.getFields().setHaveWhoModify(true);

        register.prepareTransaction();
        if(!Cairo.Database.save(register, , "cIABMClient_Save", C_MODULE, c_ErrorSave)) { return _rtn; }

        m_orden = 0;

        if(!pSaveEfectivo(register.getID(), cotizacion, isDefaultCurrency)) { return _rtn; }
        if(!pSaveCheques(register.getID())) { return _rtn; }
        if(!pSaveTCheques(register.getID(), cotizacion, isDefaultCurrency)) { return _rtn; }

        var sqlstmt = null;
        var rs = null;
        sqlstmt = "sp_DocDepositoBancoSave "+ register.getID().toString();

        if(!Cairo.Database.openRs(sqlstmt, rs, , , , "cIABMClient_Save", C_MODULE, c_ErrorSave)) { return _rtn; }

        if(rs.isEOF()) { return _rtn; }

        var id = null;
        if(!GetDocIDFromRecordset(rs, id)) { return _rtn; }

        m_copy = false;

        _rtn = load(id);

        return _rtn;
      };

      var updateList = function() {
        if(m_id === NO_ID) { return; }
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
        return "#general/depositobanco/" + m_id.toString();
      };

      self.getEditorName = function() {
        var id = m_id ? m_id.toString() : "N" + (new Date).getTime().toString();
        return "depositobanco" + id;
      };

      self.getTitle = function() {
        //'Depositos Bancarios
        return Cairo.Language.getText(2160, "");
      };

      self.validate = function() {
        var property = null;

        var _count = m_dialog.getProperties().size();
        for (var _i = 0; _i < _count; _i++) {
          property = m_dialog.getProperties().item(_i);
          switch (property.getKey()) {
            case K_FECHA:
              if(ValEmpty(property.getValue(), Cairo.Constants.Types.date)) {
                //'Debe indicar una fecha
                MsgInfo(Cairo.Language.getText(1558, ""));
              }
              break;

            case K_DOC_ID:
              if(ValEmpty(property.getSelectId(), Cairo.Constants.Types.id)) {
                //'Debe indicar un documento
                MsgInfo(Cairo.Language.getText(1562, ""));
              }
              break;

            case K_CUE_ID:
              if(ValEmpty(property.getSelectId(), Cairo.Constants.Types.id)) {
                //'Debe indicar una cuenta
                MsgInfo(Cairo.Language.getText(1261, ""));
              }
              break;

            case K_SUC_ID:
              if(ValEmpty(property.getSelectId(), Cairo.Constants.Types.id)) {
                //'Debe indicar una sucursal
                MsgInfo(Cairo.Language.getText(1560, ""));
              }
              break;

            case K_COTIZACION:
              if(ValEmpty(property.getValue(), Cairo.Constants.Types.double) && property.getVisible()) {
                //'Debe indicar una cotización
                MsgInfo(Cairo.Language.getText(1626, ""));
              }
              break;
          }
        }

        return Cairo.Promises.resolvedPromise(true);
      };

      var isEmptyRow = function(key,  row,  rowIndex) {
        var _rtn = null;
        try {

          switch (key) {
            case K_EFECTIVO:
              _rtn = pIsEmptyRow(row, rowIndex);
              break;

            case K_CHEQUES:
              _rtn = pIsEmptyRowCheques(row, rowIndex);
              break;

            case K_CHEQUEST:
              _rtn = pIsEmptyRowTCheques(row, rowIndex);
              break;
          }

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "validateRow", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!

        return _rtn;
      };

      //-------------------------------------------------------------------------------------
      // Documento
      var getCIDocumento_DocId = function() {
        return m_docId;
      };

      var getCIDocumento_DocTId = function() {
        return m_doctId;
      };

      var getCIDocumento_Id = function() {
        return m_id;
      };

      var cIDocumento_LoadForPrint = function(id) {
        var _rtn = null;
        try {

          var sqlstmt = null;
          var rs = null;

          sqlstmt = "select doct_id, doc_id from DepositoBanco where dbco_id = "+ id.toString();
          if(!Cairo.Database.openRs(sqlstmt, rs)) { return _rtn; }

          m_id = id;
          m_docId = Cairo.Database.valField(rs.getFields(), mTesoreriaConstantes.DOC_ID);
          m_doctId = Cairo.Database.valField(rs.getFields(), mTesoreriaConstantes.DOCT_ID);

          _rtn = true;

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "cIDocumento_LoadForPrint", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!

        return _rtn;
      };

      //-------------------------------------------------------------------------------------
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
        return Cairo.Security.hasPermissionTo(csTesoreriaPrestacion.cSPRETSRLISTDEPOSITOBANCO);
      };

      self.setDialog = function(rhs) {
        var abmGen = null;

        m_dialog = rhs;
        m_dialog.setIsDocument(true);
      };

      self.isEditing = function() {
        return m_editing;
      };

      self.edit = function(id,  inModalWindow) {
        var p = Cairo.Promises.resolvedPromise(false);
        try {

          if(!DoCairo.Security.anAccess(csTesoreriaPrestacion.cSPRETSRLISTDEPOSITOBANCO, GetdocIdFromObjAbm(m_dialog), csE_DocTypePrestacion.cSEDOCTPRELIST)) { return p; }

          // Id = csDocChanged esto significa que se cambio
          //                   el documento estando en un
          //                   comprobante ya guardado
          //
          m_isNew = id === NO_ID || id === csDocChanged;

          p = load(id).then(
            function(success) {
              if(success) {

                if(m_dialog.getProperties().count() === 0) {
                  if(!loadCollection()) { return false; }
                }
                else {
                  pRefreshProperties();
                }

                m_editing = true;
                m_copy = false;

                success = true;
              }
              return success;
            });
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "cIEditGeneric_Edit", C_MODULE, "");
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

      var columnAfterUpdate = function(key,  lRow,  lCol) {
        var _rtn = null;
        try {

          switch (key) {
            case K_EFECTIVO:
              showTotales();
              _rtn = true;
              break;

            case K_CHEQUES:
              _rtn = pColAUpdateCheque(m_items.getProperties().item(C_CHEQUES), lRow, lCol);
              break;

            case K_CHEQUEST:
              var property = m_items.getProperties().item(C_ITEMS);
              showTotales();
              _rtn = true;
              break;
          }

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "columnAfterUpdate", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!

        return _rtn;
      };

      var columnAfterEdit = function(key,  lRow,  lCol,  newValue,  newValueID) {
        var _rtn = null;
        try {

          switch (key) {
            case K_CHEQUEST:
              _rtn = pColumnAfterEdit(m_items.getProperties().item(C_CHEQUEST), lRow, lCol, newValue, newValueID);
              break;

            case K_EFECTIVO:
            case K_CHEQUES:
              _rtn = true;
              break;
          }

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "columnAfterEdit", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!

        return _rtn;
      };

      var columnBeforeEdit = function(key,  lRow,  lCol,  iKeyAscii) {
        var _rtn = null;
        try {

          switch (key) {
            case K_CHEQUEST:
              _rtn = pColumnBeforeEdit(m_items.getProperties().item(C_ITEMS), lRow, lCol, iKeyAscii);
              break;

            case K_EFECTIVO:
            case K_CHEQUES:
              _rtn = true;
              break;
          }

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "columnBeforeEdit", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!

        return _rtn;
      };

      var pColumnBeforeEdit = function(property,  lRow,  lCol,  iKeyAscii) { // TODO: Use of ByRef founded Private Function pColumnBeforeEdit(ByRef IProperty As cIABMProperty, ByVal lRow As Long, ByVal lCol As Long, ByVal iKeyAscii As Integer)
        return true;
      };

      var pColAUpdateCheque = function(property,  lRow,  lCol) { // TODO: Use of ByRef founded Private Function pColAUpdateCheque(ByRef IProperty As cIABMProperty, ByVal lRow As Long, ByVal lCol As Long) As Boolean
        var _rtn = null;
        var row = null;
        var value = null;

        var w_grid = property.getGrid();
        switch (w_grid.getColumns(lCol).Key) {
          case KICH_IMPORTEORIGEN:
            row = w_grid.getRows(lRow);
            var w_pCell = Dialogs.cell(row, KICH_MON_ID);
            if(w_pCell.getID() !== m_monDefault || w_pCell.getID() === 0) {
              Dialogs.cell(row, KICH_IMPORTE).getValue() === Cairo.Util.val(Dialogs.cell(row, KICH_IMPORTEORIGEN).getValue()) * Cairo.Util.val(pGetCotizacion().getValue());
            }
            else {
              Dialogs.cell(row, KICH_IMPORTEORIGEN).getValue() === 0;
            }

            break;

          case KICH_IMPORTE:

            break;

          case KI_CUE_ID_HABER:
            var monId = null;
            var cueId = null;
            var moneda = null;

            row = w_grid.getRows(lRow);

            cueId = Dialogs.cell(row, KI_CUE_ID_HABER).getID();
            GetMonedaFromCuenta(monId, moneda, cueId);

            var w_pCell = Dialogs.cell(row, KICH_MON_ID);
            w_pCell.setValue(moneda);
            w_pCell.setID(monId);

            if(monId === m_monDefault || monId === 0) {
              Dialogs.cell(row, KICH_IMPORTEORIGEN).getValue() === 0;
            }

            cABMUtil.pCol(property.getGrid().getColumns(), KICH_CHEQUERA).getHelpFilter() === mTesoreriaConstantes.CUE_ID+ "="+ cueId.toString();

                    #If PREPROC_SFS Then;
            var abmObj = null;
                    #Else;
            var abmObj = null;
                    #End If;
            abmObj = m_items;
            abmObj.RefreshColumnProperties(property, C_CHEQUERA);

            _rtn = true;
            return _rtn;

            break;

          case KICH_CHEQUERA:

            row = w_grid.getRows(lRow);
            var w_pCell = Dialogs.cell(row, KICH_CHEQUERA);
            if(w_pCell.getID() !== NO_ID) {
              Dialogs.cell(row, KICH_CHEQUE).getValue() === GetChequeNumber(w_pCell.getID());
            }

            break;

          default:
            _rtn = true;
            return _rtn;
            break;
        }

        showTotales();
        _rtn = true;

        return _rtn;
      };

      var pColumnAfterEdit = function(property,  lRow,  lCol,  newValue,  newValueID) { // TODO: Use of ByRef founded Private Function pColumnAfterEdit(ByRef IProperty As cIABMProperty, ByVal lRow As Long, ByVal lCol As Long, ByVal NewValue As Variant, ByVal NewValueID As Long)
        var row = null;

        switch (property.getGrid().getColumns(lCol).Key) {
          case KI_CHEQ_ID:
            row = property.getGrid().getRows(lRow);
            pSetChequeData(row, newValueID);
            break;
        }

        return true;
      };

      var columnButtonClick = function(key,  lRow,  lCol,  iKeyAscii) {

      };

      var columnClick = function(key,  lRow,  lCol) {

      };

      var dblClick = function(key,  lRow,  lCol) {

      };

      var deleteRow = function(key,  row,  lRow) {
        var id = null;

        switch (key) {
          case K_CHEQUES:
            id = Cairo.Util.val(Dialogs.cell(row, KI_DBCOI_ID).getValue());
            if(id !== NO_ID) { m_chequesDeleted = m_chequesDeleted+ id.toString()+ ","; }
            break;

          case K_CHEQUEST:
            id = Cairo.Util.val(Dialogs.cell(row, KI_DBCOI_ID).getValue());
            if(id !== NO_ID) { m_tChequesDeleted = m_tChequesDeleted+ id.toString()+ ","; }
            break;

          case K_EFECTIVO:
            id = Cairo.Util.val(Dialogs.cell(row, KI_DBCOI_ID).getValue());
            if(id !== NO_ID) { m_efectivoDeleted = m_efectivoDeleted+ id.toString()+ ","; }
            break;
        }

        return true;
      };

      var listAdHock = function(key,  row,  colIndex,  list) {

      };

      var newRow = function(key,  rows) {

      };

      var validateRow = function(key,  row,  rowIndex) {
        var _rtn = null;
        try {

          switch (key) {
            case K_EFECTIVO:
              _rtn = pValidateRow(row, rowIndex);
              break;

            case K_CHEQUES:
              _rtn = pValidateRowCheques(row, rowIndex);
              break;

            case K_CHEQUEST:
              _rtn = pValidateRowTCheques(row, rowIndex);
              break;
          }

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "validateRow", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!

        return _rtn;
      };

      var pIsEmptyRow = function(row,  rowIndex) {
        var cell = null;
        var strRow = null;

        strRow = " (Fila "+ rowIndex.toString()+ ")";

        var bRowIsEmpty = true;

        var _count = row.size();
        for (var _i = 0; _i < _count; _i++) {
          cell = row.item(_i);
          switch (cell.getKey()) {
            case KI_IMPORTE:
              if(!ValEmpty(cell.getValue(), Cairo.Constants.Types.currency)) {
                bRowIsEmpty = false;
                break;
              }
              break;
          }
        }

        return bRowIsEmpty;
      };

      var pIsEmptyRowCheques = function(row,  rowIndex) {

        var cell = null;
        var strRow = null;

        strRow = " (Fila "+ rowIndex.toString()+ ")";

        var bRowIsEmpty = true;

        var _count = row.size();
        for (var _i = 0; _i < _count; _i++) {
          cell = row.item(_i);
          switch (cell.getKey()) {
            case KI_CUE_ID_HABER:
            case KICH_CHEQUERA:
            case KICH_MON_ID:
            case KICH_CLE_ID:
              if(!ValEmpty(cell.getId(), Cairo.Constants.Types.id)) {
                bRowIsEmpty = false;
                break;
              }

              break;

            case KICH_IMPORTE:
            case KICH_IMPORTEORIGEN:
              if(!ValEmpty(Cairo.Util.val(cell.getValue()), Cairo.Constants.Types.double)) {
                var bRowIsEmpty = true;
                break;
              }

              break;

            case KICH_DESCRIP:
            case KICH_CHEQUE:
              if(!ValEmpty(cell.getValue(), Cairo.Constants.Types.text)) {
                var bRowIsEmpty = true;
                break;
              }
              break;
          }
        }

        return bRowIsEmpty;
      };

      var pIsEmptyRowTCheques = function(row,  rowIndex) {
        var cell = null;
        var strRow = null;

        strRow = " (Fila "+ rowIndex.toString()+ ")";

        var bRowIsEmpty = true;

        var _count = row.size();
        for (var _i = 0; _i < _count; _i++) {
          cell = row.item(_i);
          switch (cell.getKey()) {
            case KI_IMPORTE:
              if(!ValEmpty(cell.getValue(), Cairo.Constants.Types.currency)) {
                bRowIsEmpty = false;
                break;
              }
              break;
          }
        }

        return bRowIsEmpty;
      };

      var pValidateRowTCheques = function(row,  rowIndex) { // TODO: Use of ByRef founded Private Function pValidateRowTCheques(ByRef Row As CSInterfacesABM.cIABMGridRow, ByVal RowIndex As Long) As Boolean
        var cell = null;
        var bCueIdOrCheqe = null;

        var strRow = " (Row: " + rowIndex.toString() + ")";

        var _count = row.size();
        for (var _i = 0; _i < _count; _i++) {
          cell = row.item(_i);
          switch (cell.getKey()) {
            case KI_IMPORTE:
              if(ValEmpty(cell.getValue(), Cairo.Constants.Types.currency)) {
                //'Debe indicar un importe (1)
                MsgInfo(Cairo.Language.getText(1897, "", strRow));
              }
              break;

            case KI_CHEQ_ID:
              if(!ValEmpty(cell.getId(), Cairo.Constants.Types.id)) {
                bCueIdOrCheqe = true;
              }
              break;

            case KI_CUE_ID:
              if(!ValEmpty(cell.getId(), Cairo.Constants.Types.id)) {
                bCueIdOrCheqe = true;
              }
              break;
          }
        }

        if(!bCueIdOrCheqe) {
          //'Debe indicar una Cuenta ó un Cheque (1)
          MsgInfo(Cairo.Language.getText(2161, ""));
        }

        return Cairo.Promises.resolvedPromise(true);
      };

      var pValidateRow = function(row,  rowIndex) { // TODO: Use of ByRef founded Private Function pValidateRow(ByRef Row As CSInterfacesABM.cIABMGridRow, ByVal RowIndex As Long) As Boolean
        var cell = null;

        var strRow = " (Row: " + rowIndex.toString() + ")";

        var _count = row.size();
        for (var _i = 0; _i < _count; _i++) {
          cell = row.item(_i);
          switch (cell.getKey()) {
            case KI_IMPORTE:
              if(ValEmpty(cell.getValue(), Cairo.Constants.Types.currency)) {
                //'Debe indicar un importe (1)
                MsgInfo(Cairo.Language.getText(1897, "", strRow));
              }
              break;

            case KI_CUE_ID_HABER:
              if(ValEmpty(cell.getId(), Cairo.Constants.Types.id)) {
                //'Debe indicar una cuenta origen (1)
                MsgInfo(Cairo.Language.getText(2186, "", strRow));
              }
              break;
          }
        }

        return Cairo.Promises.resolvedPromise(true);
      };

      var pValidateRowCheques = function(row,  rowIndex) { // TODO: Use of ByRef founded Private Function pValidateRowCheques(ByRef Row As CSInterfacesABM.cIABMGridRow, ByVal RowIndex As Long) As Boolean

        var cell = null;
        var bOrigen = null;
        var monId = null;

        var strRow = " (Row: " + rowIndex.toString() + ")";

        var _count = row.size();
        for (var _i = 0; _i < _count; _i++) {
          cell = row.item(_i);
          switch (cell.getKey()) {

            case KI_CUE_ID_HABER:
              if(ValEmpty(cell.getId(), Cairo.Constants.Types.id)) {
                //'Debe indicar una cuenta origen (1)
                MsgInfo(Cairo.Language.getText(2186, "", strRow));
              }
              break;

            case KICH_MON_ID:
              if(ValEmpty(cell.getId(), Cairo.Constants.Types.id)) {
                //'Debe indicar una moneda (1)
                MsgInfo(Cairo.Language.getText(2114, "", strRow));
              }
              monId = cell.getId();

              break;

            case KICH_CLE_ID:
              if(ValEmpty(cell.getId(), Cairo.Constants.Types.id)) {
                //'Debe indicar un clearing (1)
                MsgInfo(Cairo.Language.getText(2115, "", strRow));
              }

              break;

            case KICH_IMPORTEORIGEN:
              bOrigen = !ValEmpty(Cairo.Util.val(cell.getValue()), Cairo.Constants.Types.double);

              break;

            case KICH_IMPORTE:
              if(ValEmpty(Cairo.Util.val(cell.getValue()), Cairo.Constants.Types.double)) {
                //'Debe indicar un importe (1)
                MsgInfo(Cairo.Language.getText(1897, "", strRow));
              }

              break;

            case KICH_CHEQUERA:
              if(ValEmpty(cell.getId(), Cairo.Constants.Types.id)) {
                //'Debe indicar una Chequera (1)
                MsgInfo(Cairo.Language.getText(2193, "", strRow));
              }

              break;

            case KICH_CHEQUE:
              if(ValEmpty(cell.getValue(), Cairo.Constants.Types.text)) {
                //'Debe indicar una número de cheque (1)
                MsgInfo(Cairo.Language.getText(2116, "", strRow));
              }

              break;

            case KICH_FECHACOBRO:
              if(ValEmpty(cell.getValue(), Cairo.Constants.Types.date)) {
                //'Debe indicar una fecha para depositar (1)
                MsgInfo(Cairo.Language.getText(2117, "", strRow));
              }

              break;

            case KICH_FECHAVTO:
              if(ValEmpty(cell.getValue(), Cairo.Constants.Types.date)) {
                //'Debe indicar una fecha de vencimiento (1)
                MsgInfo(Cairo.Language.getText(1384, "", strRow));
              }
              break;
          }
        }

        if(!bOrigen && monId !== m_monDefault) {
          //'Debe indicar un importe para la moneda extranjera (1)
          MsgInfo(Cairo.Language.getText(2118, "", strRow));
        }

        return Cairo.Promises.resolvedPromise(true);
      };

      // funciones privadas
      var loadCollection = function() {
        var filter = null;
        var c = null;
        var abmGen = null;
        var cotizacion = null;

        // Preferencias del usuario
        //
        var bValidateDocDefault = null;

        abmGen = m_dialog;
        abmGen.ResetLayoutMembers;

        abmGen.setNoButtons1(csButtons.bUTTON_DOC_APLIC);
        abmGen.setNoButtons2(csButtons.bUTTON_DOC_ACTION);
        abmGen.InitButtons;

        var properties = m_dialog.getProperties();

        properties.clear();

        var elem = properties.add(null, mTesoreriaConstantes.DOC_ID);
        elem.setType(Dialogs.PropertyType.select);
        elem.setTable(CSDocumento2.CSDocumento);
        //'Documento
        elem.setName(Cairo.Language.getText(1567, ""));
        elem.setKey(K_DOC_ID);

        if(m_docId !== NO_ID) {
          elem.setSelectId(m_docId);
          elem.setValue(m_documento);
        }
        else {
          // Preferencias del usuario
          //
          elem.setSelectId(m_userCfg.getDocDbcoId());
          elem.setValue(m_userCfg.getDocDbcoNombre());

          bValidateDocDefault = elem.getSelectId() !== NO_ID;
        }

        elem.setSelectFilter("'doct_id = "+ csEDocumentoTipo.cSEDT_DEPOSITOBANCO.toString()+ "'");

        var elem = properties.add(null, cDeclarations.getCsDocNumberID());
        elem.setType(Dialogs.PropertyType.numeric);
        elem.setSubType(Dialogs.PropertySubType.Integer);
        //'Número
        elem.setName(Cairo.Language.getText(1065, ""));
        elem.setKey(K_NUMERO);
        elem.setValue(m_numero);
        elem.setEnabled(false);

        var elem = properties.add(null, cDeclarations.getCsDocEstateID());
        elem.setType(Dialogs.PropertyType.text);
        //'Estado
        elem.setName(Cairo.Language.getText(1568, ""));
        elem.setKey(K_EST_ID);
        elem.setValue(m_estado);
        elem.setEnabled(false);

        var elem = properties.add(null, mTesoreriaConstantes.DBCO_FECHA);
        elem.setType(Dialogs.PropertyType.date);
        //'Fecha
        elem.setName(Cairo.Language.getText(1569, ""));
        elem.setLeftLabel(-580);
        elem.setLeft(700);
        elem.setKey(K_FECHA);
        elem.setValue(m_fecha);

        var elem = properties.add(null, mTesoreriaConstantes.DBCO_NRODOC);
        elem.setType(Dialogs.PropertyType.text);
        //'Número
        elem.setName(Cairo.Language.getText(1065, ""));
        elem.setSize(50);
        elem.setKey(K_NRODOC);
        elem.setValue(m_nrodoc);
        elem.setTextMask(m_taMascara);
        elem.setTextAlign(vbRightJustify);

        var elem = properties.add(null, mTesoreriaConstantes.BCO_ID);
        elem.setType(Dialogs.PropertyType.select);
        elem.setSelectTable(Cairo.Tables.BANCO);
        elem.setTopFromProperty(mTesoreriaConstantes.DBCO_FECHA);
        elem.setLeft(3800);
        elem.setLeftLabel(-580);
        //'Banco
        elem.setName(Cairo.Language.getText(1122, ""));
        elem.setKey(K_BCO_ID);
        elem.setSelectId(m_bcoId);
        elem.setValue(m_banco);
        abmGen.NewKeyPropFocus = mTesoreriaConstantes.BCO_ID;
        elem.setWidth(4500);

        var elem = properties.add(null, mTesoreriaConstantes.CUE_ID);
        elem.setType(Dialogs.PropertyType.select);
        elem.setSelectTable(Cairo.Tables.CUENTA);
        elem.setSelectFilter(getFilterCuenta(m_bcoId));
        elem.setLeftLabel(-580);
        //'Cuenta
        elem.setName(Cairo.Language.getText(1267, ""));
        elem.setKey(K_CUE_ID);
        elem.setSelectId(m_cueId);
        elem.setValue(m_cuenta);
        elem.setWidth(4500);

        var elem = properties.add(null, mTesoreriaConstantes.LGJ_ID);
        elem.setType(Dialogs.PropertyType.select);
        elem.setTable(CSLEGAJO);
        elem.setTopFromProperty(mTesoreriaConstantes.DBCO_FECHA);
        elem.setLeft(9400);
        //'Legajo
        elem.setName(Cairo.Language.getText(1575, ""));
        elem.setKey(K_LGJ_ID);
        elem.setSelectId(m_lgjId);
        elem.setValue(m_legajo);
        elem.setLeftLabel(-800);

        var elem = properties.add(null, mTesoreriaConstantes.DBCO_COTIZACION);
        elem.setType(Dialogs.PropertyType.numeric);
        elem.setSubType(Dialogs.PropertySubType.money);
        //'Cotización
        elem.setName(Cairo.Language.getText(1635, ""));
        elem.setFormat(m_generalConfig.getFormatDecCotizacion());
        elem.setKey(K_COTIZACION);
        elem.setValue(m_cotizacion);
        elem.setWidth(1000);
        elem.setLeftLabel(-800);
        elem.setVisible(m_monId !== m_monDefault);

        if(m_cotizacion !== 0) {
          cotizacion = m_cotizacion;
        }
        else {
          cotizacion = 1;
        }

        var elem = properties.add(null, mTesoreriaConstantes.SUC_ID);
        elem.setType(Dialogs.PropertyType.select);
        elem.setSelectTable(Cairo.Tables.SUCURSAL);
        //'Sucursal
        elem.setName(Cairo.Language.getText(1281, ""));
        elem.setKey(K_SUC_ID);
        elem.setSelectId(m_sucId);
        elem.setValue(m_sucursal);
        elem.setLeftLabel(-800);

        var elem = properties.add(null, mTesoreriaConstantes.DBCO_DESCRIP);
        elem.setType(Dialogs.PropertyType.text);
        elem.setSubType(Dialogs.PropertySubType.memo);
        //'Observ.
        elem.setName(Cairo.Language.getText(1211, ""));
        elem.setLeftLabel(-600);
        elem.setSize(5000);
        elem.setKey(K_DESCRIP);
        elem.setValue(m_descrip);
        elem.setLeftFromProperty(mTesoreriaConstantes.DBCO_FECHA);
        elem.setTopFromProperty(mTesoreriaConstantes.DBCO_NRODOC);
        elem.setWidth(5380);
        elem.setHeight(800);
        elem.setTopToPrevious(440);

        if(!m_dialog.show(self)) { return false; }

        var c_TabEfectivo = 0;
        var c_TabCheque = 1;
        var c_TabChequeT = 2;

        var w_tabs = m_items.getTabs();

        w_tabs.clear();

        var tab = w_tabs.add(null);
        tab.setIndex(c_TabEfectivo);
        //'Efectivo
        tab.setName(Cairo.Language.getText(2100, ""));

        var tab = w_tabs.add(null);
        tab.setIndex(c_TabCheque);
        //'Cheques
        tab.setName(Cairo.Language.getText(2099, ""));

        var tab = w_tabs.add(null);
        tab.setIndex(c_TabChequeT);
        //'Cheques en Cartera
        tab.setName(Cairo.Language.getText(2188, ""));

        abmGen = m_items;
        abmGen.ResetLayoutMembers;

        var properties = m_items.getProperties();

        ///////////////////////////////////////////////////////////////////
        // EFECTIVO
        c = properties.add(null, C_EFECTIVO);
        c.setType(Dialogs.PropertyType.grid);
        c.hideLabel();;
        setGridEfectivo(c);
        if(!pLoadEfectivo(c, cotizacion)) { return false; }
        c.setName(C_EFECTIVO);
        c.setKey(K_EFECTIVO);
        c.setTabIndex(0);
        c.setGridAddEnabled(true);
        c.setGridEditEnabled(true);
        c.setGridRemoveEnabled(true);
        m_efectivoDeleted = "";

        ///////////////////////////////////////////////////////////////////
        // CHEQUES
        c = properties.add(null, C_CHEQUES);
        c.setType(Dialogs.PropertyType.grid);
        c.hideLabel();;
        setGridCheques(c);
        if(!pLoadCheques(c)) { return false; }
        c.setName(C_CHEQUES);
        c.setKey(K_CHEQUES);
        c.setTabIndex(c_TabCheque);
        c.setGridAddEnabled(true);
        c.setGridEditEnabled(true);
        c.setGridRemoveEnabled(true);

        m_chequesDeleted = "";

        ///////////////////////////////////////////////////////////////////
        // CHEQUES DE TERCERO
        c = properties.add(null, C_CHEQUEST);
        c.setType(Dialogs.PropertyType.grid);
        c.hideLabel();;
        setGridTCheques(c);
        if(!pLoadTCheques(c, cotizacion)) { return false; }
        c.setName(C_CHEQUEST);
        c.setKey(K_CHEQUEST);
        c.setTabIndex(c_TabChequeT);
        c.setGridAddEnabled(true);
        c.setGridEditEnabled(true);
        c.setGridRemoveEnabled(true);

        m_tChequesDeleted = "";

        if(!m_items.show(self)) { return false; }

        abmGen = m_footer;
        abmGen.ResetLayoutMembers;

        var properties = m_footer.getProperties();

        properties.clear();

        c = properties.add(null, mTesoreriaConstantes.DBCO_TOTAL);
        c.setType(Dialogs.PropertyType.numeric);
        c.setFormat(m_generalConfig.getFormatDecImporte());
        //'Total
        c.setName(Cairo.Language.getText(1584, ""));
        c.setSubType(Dialogs.PropertySubType.money);
        c.setKey(K_TOTAL);
        c.setValue(m_total);
        c.setEnabled(false);

        setEnabled();

        if(!m_footer.show(self)) { return false; }

        // Preferencias del Usuario
        //
        if(bValidateDocDefault) {
          self.propertyChange(K_DOC_ID);
        }

        showCotizacion();

        return true;
      };

      var refreshCollection = function() {

        m_dialog.setTitle(m_name);

        var properties = m_dialog.getProperties();

        var elem = properties.item(mTesoreriaConstantes.DOC_ID);
        elem.setSelectId(m_docId);
        elem.setValue(m_documento);
        elem.setSelectId(m_userCfg.getDocDbcoId());
        elem.setValue(m_userCfg.getDocDbcoNombre());

        var elem = properties.item(cDeclarations.getCsDocNumberID());
        elem.setValue(m_numero);

        var elem = properties.item(cDeclarations.getCsDocEstateID());
        elem.setValue(m_estado);

        var elem = properties.item(mTesoreriaConstantes.DBCO_FECHA);
        elem.setValue(m_fecha);

        var elem = properties.item(mTesoreriaConstantes.DBCO_NRODOC);
        elem.setValue(m_nrodoc);

        var elem = properties.item(mTesoreriaConstantes.BCO_ID);
        elem.setSelectId(m_bcoId);
        elem.setValue(m_banco);

        var elem = properties.item(mTesoreriaConstantes.CUE_ID);
        elem.setSelectId(m_cueId);
        elem.setValue(m_cuenta);

        var elem = properties.item(mTesoreriaConstantes.LGJ_ID);
        elem.setSelectId(m_lgjId);
        elem.setValue(m_legajo);

        var elem = properties.item(mTesoreriaConstantes.DBCO_COTIZACION);
        elem.setValue(m_cotizacion);

        var elem = properties.item(mTesoreriaConstantes.SUC_ID);
        elem.setSelectId(m_sucId);
        elem.setValue(m_sucursal);

        var elem = properties.item(mTesoreriaConstantes.DBCO_DESCRIP);
        elem.setValue(m_descrip);

        return m_dialog.showValues(properties);
      };

      // Cotizacion
      var showCotizacion = function() {
        var monId = null;
        var dDate = null;
        var iProp = null;
        var bCueChanged = null;

        var w_pGetCuenta = getCuenta();

        if(!(m_lastCueId === w_pGetCuenta.getSelectId() && !m_copy)) {
          m_lastCueId = w_pGetCuenta.getSelectId();
          m_lastCueName = w_pGetCuenta.getValue();
          bCueChanged = true;
        }

        if(!Cairo.Database.getData(mTesoreriaConstantes.CUENTA, mTesoreriaConstantes.CUE_ID, m_lastCueId, mTesoreriaConstantes.MON_ID, monId)) { return; }

        iProp = m_dialog.getProperties().item(mTesoreriaConstantes.DBCO_COTIZACION);
        iProp.setVisible(monId !== m_monDefault && monId !== NO_ID);

        if(bCueChanged) {

          if(m_lastMonIdCotizacion !== monId || iProp.getValue() === 0) {
            dDate = m_dialog.getProperties().item(mTesoreriaConstantes.DBCO_FECHA).getValue();
            if(!IsDate(dDate)) { dDate = Date; }
            iProp.setValue(cMoneda.getCotizacion(monId, dDate));
            m_lastMonIdCotizacion = monId;
          }
        }

        m_dialog.showValue(iProp);
      };

      //Private Function pGetMonedaDefault() As Long
      //  Dim sqlstmt As String
      //  Dim rs      As Recordset
      //
      //  sqlstmt = "select mon_id from Moneda where mon_legal <> 0"
      //  If Not gDB.OpenRs(sqlstmt, rs) Then Exit Function
      //
      //  If rs.EOF Then
      //    MsgWarning Cairo.Language.getText(2150, vbNullString)  'Debe definir cual es la moneda legal con la que opera el sistema
      //    Exit Function
      //  End If
      //
      //  pGetMonedaDefault = gDB.ValField(rs.Fields, cscMonId)
      //End Function

      var setGridEfectivo = function(property) {

        var o = null;

        var w_grid = property.getGrid();

        w_grid.getColumns().clear();
        w_grid.getRows().clear();

        var w_columns = w_grid.getColumns();

        var elem = w_columns.add(null);
        elem.setVisible(false);
        elem.setKey(KI_DBCOI_ID);

        var elem = w_columns.add(null);
        //'Cuenta Origen
        elem.setName(Cairo.Language.getText(2190, ""));
        elem.setType(Dialogs.PropertyType.select);
        elem.setSelectTable(Cairo.Tables.CUENTA);
        elem.setWidth(1800);
        elem.setKey(KI_CUE_ID_HABER);
        elem.setSelectFilter(GetHelpFilterCuenta());

        var elem = w_columns.add(null);
        //'Importe
        elem.setName(Cairo.Language.getText(1228, ""));
        elem.setType(Dialogs.PropertyType.numeric);
        elem.setFormat(m_generalConfig.getFormatDecImporte());
        elem.setSubType(Dialogs.PropertySubType.money);
        elem.setWidth(1200);
        elem.setKey(KI_IMPORTE);

        var elem = w_columns.add(null);
        elem.setName(Cairo.Constants.DESCRIPTION_LABEL);
        elem.setType(Dialogs.PropertyType.text);
        elem.setSubType(Dialogs.PropertySubType.textButtonEx);
        elem.setWidth(4000);
        elem.setKey(KI_DESCRIP);

        var w_rows = w_grid.getRows();
        for(var _i = 0; _i < m_data.efectivo.length; _i += 1) {

          var elem = w_rows.add(null, rs(mTesoreriaConstantes.DBCOI_ID).Value);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.efectivo[_i], mTesoreriaConstantes.DBCOI_ID);
          elem.setKey(KI_DBCOI_ID);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.efectivo[_i], mTesoreriaConstantes.CUE_NAME);
          elem.Id = Cairo.Database.valField(m_data.efectivo[_i], mTesoreriaConstantes.CUE_ID);
          elem.setKey(KI_CUE_ID_HABER);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.efectivo[_i], mTesoreriaConstantes.DBCOI_IMPORTE) / cotizacion;
          elem.setKey(KI_IMPORTE);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.efectivo[_i], mTesoreriaConstantes.DBCOI_DESCRIP);
          elem.setKey(KI_DESCRIP);

        }

        return true;
      };

      var setGridCheques = function(property) {

        var w_grid = property.getGrid();

        w_grid.getColumns().clear();
        w_grid.getRows().clear();

        var w_columns = w_grid.getColumns();

        var elem = w_columns.add(null);
        elem.setVisible(false);
        elem.setKey(KI_DBCOI_ID);

        var elem = w_columns.add(null);
        //'Cuenta Origen
        elem.setName(Cairo.Language.getText(2190, ""));
        elem.setType(Dialogs.PropertyType.select);
        elem.setSelectTable(Cairo.Tables.CUENTA);

        //.HelpFilter = cscCuecId & "=" & csECuecBancos
        elem.setSelectFilter(mPublic.self.getHelpFilterChequesP());

        elem.setWidth(2200);
        elem.setKey(KI_CUE_ID_HABER);

        var elem = w_columns.add(null, C_CHEQUERA);
        //'Chequera
        elem.setName(Cairo.Language.getText(2064, ""));
        elem.setType(Dialogs.PropertyType.select);
        elem.setSelectTable(Cairo.Tables.CHEQUERA);
        elem.setWidth(1000);
        elem.setKey(KICH_CHEQUERA);

        var elem = w_columns.add(null);
        //'Mon
        elem.setName(Cairo.Language.getText(2063, ""));
        elem.setType(Dialogs.PropertyType.select);
        elem.setSelectTable(Cairo.Tables.MONEDA);
        elem.setWidth(520);
        elem.setKey(KICH_MON_ID);
        elem.setEnabled(false);

        var elem = w_columns.add(null);
        //'Origen
        elem.setName(Cairo.Language.getText(1901, ""));
        elem.setType(Dialogs.PropertyType.numeric);
        elem.setFormat(m_generalConfig.getFormatDecImporte());
        elem.setSubType(Dialogs.PropertySubType.money);
        elem.setWidth(920);
        elem.setKey(KICH_IMPORTEORIGEN);

        var elem = w_columns.add(null);
        //'Importe
        elem.setName(Cairo.Language.getText(1228, ""));
        elem.setType(Dialogs.PropertyType.numeric);
        elem.setFormat(m_generalConfig.getFormatDecImporte());
        elem.setSubType(Dialogs.PropertySubType.money);
        elem.setWidth(920);
        elem.setKey(KICH_IMPORTE);

        var elem = w_columns.add(null);
        //'Nr. Cheque
        elem.setName(Cairo.Language.getText(2059, ""));
        elem.setType(Dialogs.PropertyType.text);
        elem.setWidth(1000);
        elem.setKey(KICH_CHEQUE);

        var elem = w_columns.add(null);
        //'Cheque
        elem.setName(Cairo.Language.getText(2058, ""));
        elem.setType(Dialogs.PropertyType.text);
        elem.setWidth(1000);
        elem.setEnabled(false);
        elem.setKey(KICH_CHEQ_ID);

        var elem = w_columns.add(null);
        //'Depositar el
        elem.setName(Cairo.Language.getText(2065, ""));
        elem.setType(Dialogs.PropertyType.date);
        elem.setDefaultValue(new cABMGridRowValue());
        elem.getDefaultValue().setValue(Date);
        elem.setWidth(970);
        elem.setKey(KICH_FECHACOBRO);

        var elem = w_columns.add(null);
        //'Vto.
        elem.setName(Cairo.Language.getText(1634, ""));
        elem.setType(Dialogs.PropertyType.date);
        elem.setWidth(970);
        elem.setDefaultValue(new cABMGridRowValue());
        elem.getDefaultValue().setValue(DateAdd("m", 1, Date));
        elem.setKey(KICH_FECHAVTO);

        var elem = w_columns.add(null);
        //'Clering
        elem.setName(Cairo.Language.getText(1083, ""));
        elem.setType(Dialogs.PropertyType.select);
        elem.setSelectTable(Cairo.Tables.CLEARING);
        elem.setWidth(800);
        elem.setKey(KICH_CLE_ID);

        var elem = w_columns.add(null);
        elem.setName(Cairo.Constants.DESCRIPTION_LABEL);
        elem.setType(Dialogs.PropertyType.text);
        elem.setSubType(Dialogs.PropertySubType.textButtonEx);
        elem.setWidth(1600);
        elem.setKey(KICH_DESCRIP);

        var w_rows = w_grid.getRows();

        for(var _i = 0; _i < m_data.cheques.length; _i += 1) {

          var elem = w_rows.add(null, rs(mTesoreriaConstantes.DBCOI_ID).Value);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.DBCOI_ID);
          elem.setKey(KI_DBCOI_ID);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CUE_NAME);
          elem.Id = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CUE_ID);
          elem.setKey(KI_CUE_ID_HABER);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CHQ_CODE);
          elem.Id = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CHQ_ID);
          elem.setKey(KICH_CHEQUERA);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.MON_NAME);
          elem.Id = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.MON_ID);
          elem.setKey(KICH_MON_ID);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.DBCOI_IMPORTEORIGEN);
          elem.setKey(KICH_IMPORTEORIGEN);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.DBCOI_IMPORTE);
          elem.setKey(KICH_IMPORTE);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CHEQ_NUMERO_DOC);
          elem.setKey(KICH_CHEQUE);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CHEQ_NUMERO);
          elem.Id = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CHEQ_ID);
          elem.setKey(KICH_CHEQ_ID);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CHEQ_FECHA_COBRO);
          elem.setKey(KICH_FECHACOBRO);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CHEQ_FECHA_VTO);
          elem.setKey(KICH_FECHAVTO);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CLE_NAME);
          elem.Id = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.CLE_ID);
          elem.setKey(KICH_CLE_ID);

          var elem = elem.add(null);
          elem.Value = Cairo.Database.valField(m_data.cheques[_i], mTesoreriaConstantes.DBCOI_DESCRIP);
          elem.setKey(KICH_DESCRIP);

        }

        return true;
      };

      var setGridTCheques = function(property) {

        var o = null;
        var colCheque = null;
        var colCheqFilter = null;

        var w_columns = property.getGrid().getColumns();
        w_columns.clear();
        property.getGrid().getRows().clear();

        o = w_columns.add(null);
        o.setVisible(false);
        o.setKey(KI_DBCOI_ID);

        o = w_columns.add(null);
        //'Banco
        o.setName(Cairo.Language.getText(1122, ""));
        o.setType(Dialogs.PropertyType.text);
        o.setWidth(1800);
        o.setKey(KI_BCO_ID);
        o.setEnabled(false);

        o = w_columns.add(null);
        o.setVisible(false);
        o.setKey(KI_CHEQ_ID_SAVED);

        o = w_columns.add(null, C_COLCHEQUE);
        //'Cheque
        o.setName(Cairo.Language.getText(2058, ""));
        o.setType(Dialogs.PropertyType.select);
        o.setTable(csETablesTesoreria.cSCHEQUE);
        o.setWidth(1400);
        o.setKey(KI_CHEQ_ID);
        colCheque = o;

        o = w_columns.add(null);
        //'Cuenta
        o.setName(Cairo.Language.getText(1267, ""));
        o.setType(Dialogs.PropertyType.select);
        o.setTable(Cairo.Tables.CUENTA);
        o.setSelectFilter(pGetFilterCuentaItem());
        o.setWidth(2200);
        o.setEnabled(false);
        o.setKey(KI_CUE_ID);

        o = w_columns.add(null);
        o.setName(Cairo.Constants.DESCRIPTION_LABEL);
        o.setType(Dialogs.PropertyType.text);
        o.setSubType(Dialogs.PropertySubType.textButtonEx);
        o.setWidth(3000);
        o.setKey(KI_DESCRIP);

        o = w_columns.add(null);
        //'Importe Origen
        o.setName(Cairo.Language.getText(2162, ""));
        o.setType(Dialogs.PropertyType.numeric);
        o.setFormat(m_generalConfig.getFormatDecImporte());
        o.setSubType(Dialogs.PropertySubType.money);
        o.setWidth(1400);
        o.setEnabled(false);
        o.setKey(KI_IMPORTE_ORIGEN);

        o = w_columns.add(null);
        //'Importe
        o.setName(Cairo.Language.getText(1228, ""));
        o.setType(Dialogs.PropertyType.numeric);
        o.setFormat(m_generalConfig.getFormatDecImporte());
        o.setSubType(Dialogs.PropertySubType.money);
        o.setWidth(1200);
        o.setKey(KI_IMPORTE);

        var f = null;
        var fv = null;

        for(var _i = 0; _i < m_data.tCheques.length; _i += 1) {

          f = property.getGrid().getRows().add(null, rs(mTesoreriaConstantes.DBCOI_ID).Value);

          fv = f.add(null);
          fv.setValue(Cairo.Database.valField(m_data.tCheques[_i], mTesoreriaConstantes.DBCOI_ID));
          fv.setKey(KI_DBCOI_ID);

          fv = f.add(null);
          fv.setValue(Cairo.Database.valField(m_data.tCheques[_i], mTesoreriaConstantes.BCO_NAME));
          fv.setKey(KI_BCO_ID);

          fv = f.add(null);
          fv.setID(Cairo.Database.valField(m_data.tCheques[_i], mTesoreriaConstantes.CHEQ_ID));
          fv.setKey(KI_CHEQ_ID_SAVED);

          fv = f.add(null);
          fv.setValue(Cairo.Database.valField(m_data.tCheques[_i], mTesoreriaConstantes.CHEQ_NUMERO_DOC));
          fv.setID(Cairo.Database.valField(m_data.tCheques[_i], mTesoreriaConstantes.CHEQ_ID));
          fv.setKey(KI_CHEQ_ID);

          colCheqFilter = colCheqFilter+ fv.getID().toString()+ C_StrColon;

          fv = f.add(null);
          fv.setValue(Cairo.Database.valField(m_data.tCheques[_i], mTesoreriaConstantes.CUE_NAME));
          fv.setID(Cairo.Database.valField(m_data.tCheques[_i], mTesoreriaConstantes.CUE_ID));
          fv.setKey(KI_CUE_ID);

          fv = f.add(null);
          fv.setValue(Cairo.Database.valField(m_data.tCheques[_i], mTesoreriaConstantes.DBCOI_DESCRIP));
          fv.setKey(KI_DESCRIP);

          fv = f.add(null);
          fv.setValue(Cairo.Database.valField(m_data.tCheques[_i], mTesoreriaConstantes.DBCOI_IMPORTEORIGEN));
          fv.setKey(KI_IMPORTE_ORIGEN);

          fv = f.add(null);
          fv.setValue(Cairo.Database.valField(m_data.tCheques[_i], mTesoreriaConstantes.DBCOI_IMPORTE));
          fv.setKey(KI_IMPORTE);

        }

        colCheque.setSelectFilter(pGetFilterCheque(RemoveLastColon(colCheqFilter)));

        return true;
      };

      var load = function(id) {
        var cotizacion = null;

        var apiPath = Cairo.Database.getAPIVersion();
        return Cairo.Database.getData("load[" + apiPath + "general/depositobanco]", id).then(
          function(response) {

            if(response.success !== true) { return false; }

            if(response.data.id !== NO_ID) {

              m_cotizacion = Cairo.Database.valField(response.data, mTesoreriaConstantes.DBCO_COTIZACION);
              cotizacion = (m_cotizacion !== 0) ? m_cotizacion : 1);

              m_id = Cairo.Database.valField(response.data, mTesoreriaConstantes.DBCO_ID);
              m_numero = Cairo.Database.valField(response.data, mTesoreriaConstantes.DBCO_NUMERO);
              m_nrodoc = Cairo.Database.valField(response.data, mTesoreriaConstantes.DBCO_NRODOC);
              m_descrip = Cairo.Database.valField(response.data, mTesoreriaConstantes.DBCO_DESCRIP);
              m_fecha = Cairo.Database.valField(response.data, mTesoreriaConstantes.DBCO_FECHA);
              m_total = Cairo.Database.valField(response.data, mTesoreriaConstantes.DBCO_TOTAL) / cotizacion;
              m_bcoId = Cairo.Database.valField(response.data, mTesoreriaConstantes.BCO_ID);
              m_banco = Cairo.Database.valField(response.data, mTesoreriaConstantes.BCO_NAME);
              m_cueId = Cairo.Database.valField(response.data, mTesoreriaConstantes.CUE_ID);
              m_cuenta = Cairo.Database.valField(response.data, mTesoreriaConstantes.CUE_NAME);
              m_sucId = Cairo.Database.valField(response.data, mTesoreriaConstantes.SUC_ID);
              m_sucursal = Cairo.Database.valField(response.data, mTesoreriaConstantes.SUC_NAME);
              m_docId = Cairo.Database.valField(response.data, mTesoreriaConstantes.DOC_ID);
              m_documento = Cairo.Database.valField(response.data, mTesoreriaConstantes.DOC_NAME);
              m_doctId = Cairo.Database.valField(response.data, mTesoreriaConstantes.DOCT_ID);
              m_lgjId = Cairo.Database.valField(response.data, mTesoreriaConstantes.LGJ_ID);
              m_legajo = Cairo.Database.valField(response.data, mTesoreriaConstantes.LGJ_CODE);
              m_creado = Cairo.Database.valField(response.data, Cairo.Constants.CREADO);
              m_modificado = Cairo.Database.valField(response.data, Cairo.Constants.MODIFICADO);
              m_modifico = Cairo.Database.valField(response.data, Cairo.Constants.MODIFICO);
              m_estId = Cairo.Database.valField(response.data, Cairo.Constants.EST_ID);
              m_estado = Cairo.Database.valField(response.data, Cairo.Constants.EST_NAME);
              m_firmado = Cairo.Database.valField(response.data, mTesoreriaConstantes.DBCO_FIRMADO);
              m_monId = Cairo.Database.valField(response.data, mTesoreriaConstantes.MON_ID);
              m_docEditable = Cairo.Database.valField(response.data, Cairo.Constants.DOC_EDITABLE);
              m_docEditMsg = Cairo.Database.valField(response.data, Cairo.Constants.DOCEDIT_MSG);

              // Para ver documentos auxiliares
              //
              m_asId = Cairo.Database.valField(response.data, mTesoreriaConstantes.AS_ID);

              m_taPropuesto = Cairo.Database.valField(response.data, Cairo.Constants.TA__PROPUESTO);
              m_taMascara = Cairo.Database.valField(response.data, Cairo.Constants.TA__MASCARA);

              m_lastDocId = m_docId;
              m_lastBcoId = m_bcoId;
              m_lastCueId = m_cueId;
              m_lastDocName = m_documento;
              m_lastBcoName = m_banco;
              m_lastCueName = m_cuenta;

              m_lastMonIdCotizacion = m_monId;

            }
            else {
              m_id = NO_ID;
              m_numero = 0;
              m_nrodoc = "";
              m_descrip = "";
              m_fecha = VDGetDateById(csDateEnum.cSTODAY);
              m_total = 0;
              m_bcoId = NO_ID;
              m_banco = "";
              m_cueId = NO_ID;
              m_cuenta = "";
              m_docId = NO_ID;
              m_documento = "";
              m_doctId = NO_ID;
              m_lgjId = NO_ID;
              m_legajo = "";
              m_cotizacion = 0;
              m_monId = NO_ID;
              m_creado = Cairo.Constants.cSNODATE;
              m_modificado = Cairo.Constants.cSNODATE;
              m_modifico = 0;
              m_estId = NO_ID;
              m_estado = "";
              m_sucId = cUtil.getUser().getSuc_id();
              m_sucursal = cUtil.getUser().getSucursal();
              m_firmado = false;

              m_docId = m_lastDocId;
              m_bcoId = m_lastBcoId;
              m_cueId = m_lastCueId;
              m_banco = m_lastBcoName;
              m_documento = m_lastDocName;
              m_cuenta = m_lastCueName;

              // Para ver documentos auxiliares
              //
              m_asId = NO_ID;

              m_taPropuesto = false;
              m_taMascara = "";

              m_lastMonIdCotizacion = NO_ID;

              // Cotizacion
              if(m_docId !== NO_ID) {
                m_cotizacion = DocGetCotizacion(m_docId, m_fecha);
              }

              DocEditableGet(m_docId, m_docEditable, m_docEditMsg, csTesoreriaPrestacion.cSPRETSRNEWDEPOSITOBANCO);
            }

            return true;
          });
      };

      var setCIEditGenericDoc_Footer = function(rhs) {
        m_footer = rhs;

        if(rhs === null) { Exit Property; }

        m_footer.setIsDocument(true);
        m_footer.setIsFooter(true);
        m_footer.setObjForm(m_dialog.getObjForm());
      };

      var setCIEditGenericDoc_Items = function(rhs) {
        m_items = rhs;

        if(rhs === null) { Exit Property; }

        m_items.setIsDocument(true);
        m_items.setIsItems(true);
        m_items.setObjForm(m_dialog.getObjForm());
      };

      var pSaveEfectivo = function(id,  cotizacion,  bMonedaLegal) {
        var register = null;
        var origen = null;

        var row = null;
        var cell = null;

        var _count = m_items.getProperties().item(C_EFECTIVO).getGrid().getRows().size();
        for (var _i = 0; _i < _count; _i++) {
          row = m_items.getProperties().item(C_EFECTIVO).getGrid().getRows().item(_i);

          register = new cRegister();
          register.setFieldId(mTesoreriaConstantes.DBCOI_TMPID);
          register.setTable(mTesoreriaConstantes.DEPOSITOBANCOITEMTMP);
          register.setId(Cairo.Constants.NEW_ID);

          var _count = row.size();
          for (var _j = 0; _j < _count; _j++) {
            cell = row.item(_j);
            switch (cell.getKey()) {

              case KI_DBCOI_ID:
                if(m_copy) {
                  register.getFields().add2(mTesoreriaConstantes.DBCOI_ID, Cairo.Constants.NEW_ID, Cairo.Constants.Types.integer);
                }
                else {
                  register.getFields().add2(mTesoreriaConstantes.DBCOI_ID, Cairo.Util.val(cell.getValue()), Cairo.Constants.Types.integer);
                }
                break;

              case KI_DESCRIP:
                register.getFields().add2(mTesoreriaConstantes.DBCOI_DESCRIP, cell.getValue(), Cairo.Constants.Types.text);
                break;

              case KI_CUE_ID_HABER:
                register.getFields().add2(mTesoreriaConstantes.CUE_ID, cell.getId(), Cairo.Constants.Types.id);
                break;

              case KI_IMPORTE:
                origen = cell.getValue();
                break;
            }
          }

          register.getFields().add2(mTesoreriaConstantes.DBCOI_IMPORTE, origen * cotizacion, Cairo.Constants.Types.currency);
          if(bMonedaLegal) {
            register.getFields().add2(mTesoreriaConstantes.DBCOI_IMPORTEORIGEN, 0, Cairo.Constants.Types.currency);
          }
          else {
            register.getFields().add2(mTesoreriaConstantes.DBCOI_IMPORTEORIGEN, origen, Cairo.Constants.Types.currency);
          }

          m_orden = m_orden + 1;
          register.getFields().add2(mTesoreriaConstantes.DBCOI_ORDEN, m_orden, Cairo.Constants.Types.integer);
          register.getFields().add2(mTesoreriaConstantes.DBCOI_TIPO, csEDepositoBancoItemTipo.cSDBCOITEFECTIVO, Cairo.Constants.Types.integer);
          register.getFields().add2(mTesoreriaConstantes.DBCO_TMPID, id, Cairo.Constants.Types.id);

          register.getFields().setHaveLastUpdate(false);
          register.getFields().setHaveWhoModify(false);

          if(!Cairo.Database.save(register, , "pSaveEfectivo", C_MODULE, c_ErrorSave)) { return false; }
        }

        var sqlstmt = null;

        if(m_efectivoDeleted !== "" && m_id !== NO_ID && !m_copy) {

          var vDeletes = null;
          var i = null;

          m_efectivoDeleted = RemoveLastColon(m_efectivoDeleted);
          vDeletes = Split(m_efectivoDeleted, ",");

          for (i = 0; i <= vDeletes.Length; i++) {

            register = new cRegister();
            register.setFieldId(mTesoreriaConstantes.DBCOIB_TMPID);
            register.setTable(mTesoreriaConstantes.DEPOSITOBANCOITEMBORRADOTMP);
            register.setId(Cairo.Constants.NEW_ID);

            register.getFields().add2(mTesoreriaConstantes.DBCOI_ID, Cairo.Util.val(vDeletes(i)), Cairo.Constants.Types.integer);
            register.getFields().add2(mTesoreriaConstantes.DBCO_ID, m_id, Cairo.Constants.Types.id);
            register.getFields().add2(mTesoreriaConstantes.DBCO_TMPID, id, Cairo.Constants.Types.id);

            register.getFields().setHaveLastUpdate(false);
            register.getFields().setHaveWhoModify(false);

            if(!Cairo.Database.save(register, , "pSaveEfectivo", C_MODULE, c_ErrorSave)) { return false; }
          }

        }

        return true;
      };

      var pSaveCheques = function(id) {
        var register = null;
        var property = null;

        var row = null;
        var cell = null;

        var _count = pGetCheques().getRows().size();
        for (var _i = 0; _i < _count; _i++) {
          row = pGetCheques().getRows().item(_i);

          register = new cRegister();
          register.setFieldId(mTesoreriaConstantes.DBCOI_TMPID);
          register.setTable(mTesoreriaConstantes.DEPOSITOBANCOITEMTMP);
          register.setId(Cairo.Constants.NEW_ID);

          var _count = row.size();
          for (var _j = 0; _j < _count; _j++) {
            cell = row.item(_j);
            switch (cell.getKey()) {

              case KI_DBCOI_ID:
                if(m_copy) {
                  register.getFields().add2(mTesoreriaConstantes.DBCOI_ID, Cairo.Constants.NEW_ID, Cairo.Constants.Types.integer);
                }
                else {
                  register.getFields().add2(mTesoreriaConstantes.DBCOI_ID, Cairo.Util.val(cell.getValue()), Cairo.Constants.Types.integer);
                }
                break;

              case KICH_DESCRIP:
                register.getFields().add2(mTesoreriaConstantes.DBCOI_DESCRIP, cell.getValue(), Cairo.Constants.Types.text);

                break;

              case KICH_CHEQUERA:
                register.getFields().add2(mTesoreriaConstantes.CHQ_ID, cell.getId(), Cairo.Constants.Types.id);

                break;

              case KICH_CHEQUE:
                register.getFields().add2(mTesoreriaConstantes.DBCOI_TMPCHEQUE, cell.getValue(), Cairo.Constants.Types.text);

                break;

              case KICH_CHEQ_ID:
                register.getFields().add2(mTesoreriaConstantes.CHEQ_ID, cell.getId(), Cairo.Constants.Types.id);

                break;

              case KICH_CLE_ID:
                register.getFields().add2(mTesoreriaConstantes.CLE_ID, cell.getId(), Cairo.Constants.Types.id);

                break;

              case KICH_FECHACOBRO:
                register.getFields().add2(mTesoreriaConstantes.DBCOI_TMPFECHA_COBRO, cell.getValue(), Cairo.Constants.Types.date);

                break;

              case KICH_FECHAVTO:
                register.getFields().add2(mTesoreriaConstantes.DBCOI_TMPFECHA_VTO, cell.getValue(), Cairo.Constants.Types.date);

                break;

              case KI_CUE_ID_HABER:
                register.getFields().add2(mTesoreriaConstantes.CUE_ID, cell.getId(), Cairo.Constants.Types.id);

                break;

              case KICH_IMPORTEORIGEN:
                register.getFields().add2(mTesoreriaConstantes.DBCOI_IMPORTEORIGEN, Cairo.Util.val(cell.getValue()), Cairo.Constants.Types.currency);

                break;

              case KICH_IMPORTE:
                register.getFields().add2(mTesoreriaConstantes.DBCOI_IMPORTE, Cairo.Util.val(cell.getValue()), Cairo.Constants.Types.currency);

                break;
            }
          }

          m_orden = m_orden + 1;
          register.getFields().add2(mTesoreriaConstantes.DBCOI_ORDEN, m_orden, Cairo.Constants.Types.integer);
          register.getFields().add2(mTesoreriaConstantes.DBCOI_TIPO, csEDepositoBancoItemTipo.cSDBCOITCHEQUES, Cairo.Constants.Types.integer);
          register.getFields().add2(mTesoreriaConstantes.DBCO_TMPID, id, Cairo.Constants.Types.id);

          register.getFields().setHaveLastUpdate(false);
          register.getFields().setHaveWhoModify(false);

          if(!Cairo.Database.save(register, , "pSaveCheques", C_MODULE, c_ErrorSave)) { return false; }
        }

        var sqlstmt = null;

        if(m_chequesDeleted !== "" && m_id !== NO_ID && !m_copy) {

          var vDeletes = null;
          var i = null;

          m_chequesDeleted = RemoveLastColon(m_chequesDeleted);
          vDeletes = Split(m_chequesDeleted, ",");

          for (i = 0; i <= vDeletes.Length; i++) {

            register = new cRegister();
            register.setFieldId(mTesoreriaConstantes.DBCOIB_TMPID);
            register.setTable(mTesoreriaConstantes.DEPOSITOBANCOITEMBORRADOTMP);
            register.setId(Cairo.Constants.NEW_ID);

            register.getFields().add2(mTesoreriaConstantes.DBCOI_ID, Cairo.Util.val(vDeletes(i)), Cairo.Constants.Types.integer);
            register.getFields().add2(mTesoreriaConstantes.DBCO_ID, m_id, Cairo.Constants.Types.id);
            register.getFields().add2(mTesoreriaConstantes.DBCO_TMPID, id, Cairo.Constants.Types.id);

            register.getFields().setHaveLastUpdate(false);
            register.getFields().setHaveWhoModify(false);

            if(!Cairo.Database.save(register, , "pSaveCheques", C_MODULE, c_ErrorSave)) { return false; }
          }

        }

        return true;
      };

      var pSaveTCheques = function(id,  cotizacion,  bMonedaLegal) {
        var register = null;
        var origen = null;

        var row = null;
        var cell = null;

        var _count = m_items.getProperties().item(C_CHEQUEST).getGrid().getRows().size();
        for (var _i = 0; _i < _count; _i++) {
          row = m_items.getProperties().item(C_CHEQUEST).getGrid().getRows().item(_i);

          register = new cRegister();
          register.setFieldId(mTesoreriaConstantes.DBCOI_TMPID);
          register.setTable(mTesoreriaConstantes.DEPOSITOBANCOITEMTMP);
          register.setId(Cairo.Constants.NEW_ID);

          var _count = row.size();
          for (var _j = 0; _j < _count; _j++) {
            cell = row.item(_j);
            switch (cell.getKey()) {

              case KI_DBCOI_ID:
                if(m_copy) {
                  register.getFields().add2(mTesoreriaConstantes.DBCOI_ID, Cairo.Constants.NEW_ID, Cairo.Constants.Types.integer);
                }
                else {
                  register.getFields().add2(mTesoreriaConstantes.DBCOI_ID, Cairo.Util.val(cell.getValue()), Cairo.Constants.Types.integer);
                }
                break;

              case KI_DESCRIP:
                register.getFields().add2(mTesoreriaConstantes.DBCOI_DESCRIP, cell.getValue(), Cairo.Constants.Types.text);
                break;

              case KI_CUE_ID:
                register.getFields().add2(mTesoreriaConstantes.CUE_ID, cell.getId(), Cairo.Constants.Types.id);
                break;

              case KI_CHEQ_ID:
                register.getFields().add2(mTesoreriaConstantes.CHEQ_ID, cell.getId(), Cairo.Constants.Types.id);
                break;

              case KI_IMPORTE:
                origen = cell.getValue();
                break;
            }
          }

          register.getFields().add2(mTesoreriaConstantes.DBCOI_IMPORTE, origen * cotizacion, Cairo.Constants.Types.currency);
          if(bMonedaLegal) {
            register.getFields().add2(mTesoreriaConstantes.DBCOI_IMPORTEORIGEN, 0, Cairo.Constants.Types.currency);
          }
          else {
            register.getFields().add2(mTesoreriaConstantes.DBCOI_IMPORTEORIGEN, origen, Cairo.Constants.Types.currency);
          }

          m_orden = m_orden + 1;
          register.getFields().add2(mTesoreriaConstantes.DBCOI_ORDEN, m_orden, Cairo.Constants.Types.integer);
          register.getFields().add2(mTesoreriaConstantes.DBCOI_TIPO, csEDepositoBancoItemTipo.cSDBCOITCHEQUEST, Cairo.Constants.Types.integer);
          register.getFields().add2(mTesoreriaConstantes.DBCO_TMPID, id, Cairo.Constants.Types.id);

          register.getFields().setHaveLastUpdate(false);
          register.getFields().setHaveWhoModify(false);

          if(!Cairo.Database.save(register, , "pSaveChequesT", C_MODULE, c_ErrorSave)) { return false; }
        }

        var sqlstmt = null;

        if(m_tChequesDeleted.Length && m_id !== NO_ID && !m_copy) {

          var vDeletes = null;
          var i = null;

          m_tChequesDeleted = RemoveLastColon(m_tChequesDeleted);
          vDeletes = Split(m_tChequesDeleted, ",");

          for (i = 0; i <= vDeletes.Length; i++) {

            register = new cRegister();
            register.setFieldId(mTesoreriaConstantes.DBCOIB_TMPID);
            register.setTable(mTesoreriaConstantes.DEPOSITOBANCOITEMBORRADOTMP);
            register.setId(Cairo.Constants.NEW_ID);

            register.getFields().add2(mTesoreriaConstantes.DBCOI_ID, Cairo.Util.val(vDeletes(i)), Cairo.Constants.Types.integer);
            register.getFields().add2(mTesoreriaConstantes.DBCO_ID, m_id, Cairo.Constants.Types.id);
            register.getFields().add2(mTesoreriaConstantes.DBCO_TMPID, id, Cairo.Constants.Types.id);

            register.getFields().setHaveLastUpdate(false);
            register.getFields().setHaveWhoModify(false);

            if(!Cairo.Database.save(register, , "pSaveChequesT", C_MODULE, c_ErrorSave)) { return false; }
          }

        }

        return true;
      };

      // Reglas del Objeto de Negocios
      var showTotales = function() {
        var total = null;
        var row = null;

        var _count = pGetCheques().getRows().size();
        for (var _i = 0; _i < _count; _i++) {
          row = pGetCheques().getRows().item(_i);
          total = total + Cairo.Util.val(Dialogs.cell(row, KICH_IMPORTE).getValue());
        }

        var _count = pGetTCheques().getRows().size();
        for (var _i = 0; _i < _count; _i++) {
          row = pGetTCheques().getRows().item(_i);
          total = total + Cairo.Util.val(Dialogs.cell(row, KI_IMPORTE).getValue());
        }

        var _count = pGetEfectivo().getRows().size();
        for (var _i = 0; _i < _count; _i++) {
          row = pGetEfectivo().getRows().item(_i);
          total = total + Cairo.Util.val(Dialogs.cell(row, KI_IMPORTE).getValue());
        }

        m_footer.getProperties().item(mTesoreriaConstantes.DBCO_TOTAL).setValue(total);

        m_footer.showValue(m_footer.getProperties().item(mTesoreriaConstantes.DBCO_TOTAL));
      };

      var setEnabled = function() {
        var bState = null;

        if(m_docEditable) {
          bState = m_dialog.getProperties().item(mTesoreriaConstantes.DOC_ID).getSelectId() !== NO_ID;
        }
        else {
          bState = false;
        }

        pSetEnabledAux(bState);
      };

      var pSetEnabledAux = function(bState) {
        var prop = null;

        var _count = m_dialog.getProperties().size();
        for (var _i = 0; _i < _count; _i++) {
          prop = m_dialog.getProperties().item(_i);
          if(prop.getKey() !== K_DOC_ID && prop.getKey() !== K_NUMERO && prop.getKey() !== K_EST_ID) {

            if(bState) {
              if(prop.getKey() !== K_NRODOC) {
                prop.setEnabled(bState);
              }
              else {
                prop.setEnabled(m_taPropuesto);
              }
            }
            else {
              prop.setEnabled(false);
            }
          }
        }

        var _count = m_items.getProperties().size();
        for (var _i = 0; _i < _count; _i++) {
          prop = m_items.getProperties().item(_i);
          prop.setEnabled(bState);
        }

        var abmGen = null;

        abmGen = m_items;
        abmGen.RefreshEnabledState(m_items.getProperties());

        abmGen = m_dialog;
        abmGen.RefreshEnabledState(m_dialog.getProperties());
      };

      var signDocument = function() {
        var doc = null;
        var us_id = null;

        doc = new cDocumento();

        if(m_id === NO_ID) {
          //'Antes de poder firmar el documento debe guardarlo.
          MsgWarning(Cairo.Language.getText(1592, ""));
          return null;
        }

        if(m_firmado) {
          if(!Ask(Cairo.Language.getText(1593, ""), vbYes, Cairo.Language.getText(1594, ""))) {
            //El documento ya ha sido firmado desea borrar la firma, Firmar
            return null;
          }
        }

        if(!doc.Firmar(m_docId, us_id)) { return false; }

        var sqlstmt = null;
        var rs = null;

        sqlstmt = "sp_DocDepositoBancoFirmar "+ m_id+ ","+ us_id.toString();
        if(!Cairo.Database.openRs(sqlstmt, rs)) { return false; }

        m_estId = Cairo.Database.valField(rs.getFields(), Cairo.Constants.EST_ID);
        m_estado = Cairo.Database.valField(rs.getFields(), Cairo.Constants.EST_NAME);

        var iProp = null;
        iProp = m_dialog.getProperties().item(cDeclarations.getCsDocEstateID());

        iProp.setSelectId(m_estId);
        iProp.setValue(m_estado);

        Cairo.Database.getData(mTesoreriaConstantes.DEPOSITOBANCO, mTesoreriaConstantes.DBCO_ID, m_id, mTesoreriaConstantes.DBCO_FIRMADO, m_firmado);

        m_dialog.showValue(iProp);

        return true;
      };

      var move = function(moveTo) {
        var sqlstmt = null;
        var rs = null;
        var doc_id = null;

        doc_id = m_dialog.getProperties().item(mTesoreriaConstantes.DOC_ID).getSelectId();

        //'Debe seleccionar un documento
        if(doc_id === NO_ID) { MsgInfo(Cairo.Language.getText(1595, "")); }

        sqlstmt = "sp_DocDepositoBancoMover "+ moveTo+ ","+ m_numero+ ","+ doc_id.toString();

        if(!Cairo.Database.openRs(sqlstmt, rs)) { return false; }

        // Si no obtuve ningun id al moverme
        //
        if(rs.isEOF()) {

          switch (moveTo) {

            // Si era siguiente ahora busco el ultimo
            //
            case Dialogs.Message.MSG_DOC_NEXT:
              move(Dialogs.Message.MSG_DOC_LAST);

              // Si era anterior ahora busco el primero
              //
              break;

            case Dialogs.Message.MSG_DOC_PREVIOUS:
              move(Dialogs.Message.MSG_DOC_FIRST);

              // Si no encontre ni ultimo ni primero
              // es por que no hay ningun comprobante para
              // este documento
              //
              break;

            case Dialogs.Message.MSG_DOC_FIRST:
            case Dialogs.Message.MSG_DOC_LAST:

              // Cargo un registro vacio
              //
              load(NO_ID);

              // Refresco el formulario
              //
              pRefreshProperties();

              // Obtengo un nuevo numero de comprobante
              //
              GetDocNumber(m_lastDocId, m_dialog, m_taPropuesto, mTesoreriaConstantes.DBCO_NRODOC);

              break;
          }

        }
        else {
          if(!load(Cairo.Database.valField(rs.getFields(), 0))) { return false; }

          pRefreshProperties();
        }

        return true;
      };

      var pRefreshProperties = function() {
        var c = null;
        var abmGen = null;
        var filter = null;
        var cotizacion = null;

        var properties = m_dialog.getProperties();

        c = properties.item(mTesoreriaConstantes.DOC_ID);
        c.setSelectId(m_docId);
        c.setValue(m_documento);

        c = properties.item(mTesoreriaConstantes.DBCO_FECHA);
        c.setValue(m_fecha);

        c = properties.item(mTesoreriaConstantes.BCO_ID);
        c.setSelectId(m_bcoId);
        c.setValue(m_banco);

        c = properties.item(mTesoreriaConstantes.CUE_ID);
        c.setSelectId(m_cueId);
        c.setValue(m_cuenta);
        c.setSelectFilter(getFilterCuenta(m_dialog.getProperties().item(mTesoreriaConstantes.BCO_ID).getSelectId()));

        c = properties.item(cDeclarations.getCsDocNumberID());
        c.setValue(m_numero);

        c = properties.item(cDeclarations.getCsDocEstateID());
        c.setValue(m_estado);

        c = properties.item(mTesoreriaConstantes.DBCO_NRODOC);
        c.setValue(m_nrodoc);
        c.setTextMask(m_taMascara);
        c.setTextAlign(vbRightJustify);

        c = properties.item(mTesoreriaConstantes.DBCO_COTIZACION);
        c.setValue(m_cotizacion);

        c = properties.item(mTesoreriaConstantes.SUC_ID);
        c.setSelectId(m_sucId);
        c.setValue(m_sucursal);

        c = properties.item(mTesoreriaConstantes.LGJ_ID);
        c.setSelectId(m_lgjId);
        c.setValue(m_legajo);

        c = properties.item(mTesoreriaConstantes.DBCO_DESCRIP);
        c.setValue(m_descrip);

        abmGen = m_dialog;
        abmGen.ShowValues(m_dialog.getProperties());

        abmGen.ResetChanged;

        if(m_cotizacion !== 0) {
          cotizacion = m_cotizacion;
        }
        else {
          cotizacion = 1;
        }

        c = m_items.getProperties().item(C_EFECTIVO);
        if(!pLoadEfectivo(c, cotizacion)) { return; }

        m_efectivoDeleted = "";

        c = m_items.getProperties().item(C_CHEQUES);
        if(!pLoadCheques(c)) { return; }

        m_chequesDeleted = "";

        c = m_items.getProperties().item(C_CHEQUEST);
        if(!pLoadTCheques(c, cotizacion)) { return; }

        m_tChequesDeleted = "";

        abmGen = m_items;
        abmGen.ShowValues(m_items.getProperties());

        abmGen.RefreshColumnProperties(c, C_COLCHEQUE);

        c = m_footer.getProperties().item(mTesoreriaConstantes.DBCO_TOTAL);
        c.setValue(m_total);

        abmGen = m_footer;
        abmGen.ShowValues(m_footer.getProperties());

        setEnabled();
      };

      var getFilterCuenta = function(bco_id) {
        var filter = null;

        filter = mTesoreriaConstantes.CUEC_ID+ " = "+ csECuentaCategoria.cSECUECBANCOS.toString()+ " and cuenta.emp_id = "+ cUtil.getEmpId().toString();

        if(bco_id) {
          filter = filter+ " and bco_id = "+ bco_id.toString();
        }

        return filter;
      };

      var pGetFilterCuentaItem = function() {
        return mTesoreriaConstantes.CUEC_ID+ " = "+ csECuentaCategoria.cSECUECCAJA.toString();
      };

      var pGetFilterCheque = function(cheqIds) {
        var rtn = null;

        rtn = mTesoreriaConstantes.CUEC_ID+ " = "+ csECuentaCategoria.cSECUECDOCENCARTERA.toString()+ " and cuenta.emp_id = "+ cUtil.getEmpId().toString();
        if(cheqIds !== "") {
          rtn = "("+ rtn+ ") Or (cheq_id in ("+ cheqIds+ "))";
        }

        return rtn;
      };

      var pSetChequeData = function(row,  cheq_id) { // TODO: Use of ByRef founded Private Sub pSetChequeData(ByRef Row As cIABMGridRow, ByVal cheq_id As Long)
        var sqlstmt = null;
        var rs = null;

        if(cheq_id === Dialogs.cell(row, KI_CHEQ_ID_SAVED).getID()) { return; }

        sqlstmt = "sp_chequeGetData "+ cheq_id.toString();

        if(!Cairo.Database.openRs(sqlstmt, rs)) { return; }

        if(!rs.isEOF()) {

          var w_pCell = Dialogs.cell(row, KI_CUE_ID);
          w_pCell.setID(Cairo.Database.valField(rs.getFields(), mTesoreriaConstantes.CUE_ID));
          w_pCell.setValue(Cairo.Database.valField(rs.getFields(), mTesoreriaConstantes.CUE_NAME));

          var w_pCell = Dialogs.cell(row, KI_BCO_ID);
          w_pCell.setValue(Cairo.Database.valField(rs.getFields(), mTesoreriaConstantes.BCO_NAME));

          Dialogs.cell(row, KI_IMPORTE).getValue() === Cairo.Database.valField(rs.getFields(), mTesoreriaConstantes.CHEQ_IMPORTE);
          Dialogs.cell(row, KI_IMPORTE_ORIGEN).getValue() === Cairo.Database.valField(rs.getFields(), mTesoreriaConstantes.CHEQ_IMPORTE_ORIGEN);

        }
        else {

          var w_pCell = Dialogs.cell(row, KI_CUE_ID);
          w_pCell.setID(NO_ID);
          w_pCell.setValue("");

          var w_pCell = Dialogs.cell(row, KI_BCO_ID);
          w_pCell.setValue("");

          Dialogs.cell(row, KI_IMPORTE).getValue() === 0;
          Dialogs.cell(row, KI_IMPORTE_ORIGEN).getValue() === 0;
        }
      };

      var pGetCotizacion = function() {
        return m_dialog.getProperties().item(mTesoreriaConstantes.DBCO_COTIZACION);
      };

      var pGetTCheques = function() {
        return m_items.getProperties().item(C_CHEQUEST).getGrid();
      };

      var pGetCheques = function() {
        return m_items.getProperties().item(C_CHEQUES).getGrid();
      };

      var pGetEfectivo = function() {
        return m_items.getProperties().item(C_EFECTIVO).getGrid();
      };

      // Construccion - Destruccion
      self.initialize = function() {
        try {

          //'Error al grabar el deposito bancario
          c_ErrorSave = Cairo.Language.getText(2236, "");

          m_generalConfig = new cGeneralConfig();
          m_generalConfig.Load;
          m_monDefault = GetMonedaDefault();

          // Preferencias del Usuario
          //
          m_userCfg = new cUsuarioConfig();
          m_userCfg.Load;
          m_userCfg.ValidateDBCO;

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "Class_Initialize", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
      };

      self.destroy = function() {
        try {

          m_dialog = null;
          m_listController = null;
          m_footer = null;
          m_items = null;
          m_generalConfig = null;
          m_host = null;

          // Preferencias del Usuario
          //
          m_userCfg = null;

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "Class_Terminate", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
      };

      var getCuenta = function() {
        return m_dialog.getProperties().item(mTesoreriaConstantes.CUE_ID);
      };

      var getBanco = function() {
        return m_dialog.getProperties().item(mTesoreriaConstantes.BCO_ID);
      };

      var showBanco = function() {
        var bco_id = null;
        var bco_nombre = null;
        var cue_id = null;

        cue_id = getCuenta().getSelectId();

        if(cue_id) {

          Cairo.Database.getData(mTesoreriaConstantes.CUENTA, mTesoreriaConstantes.CUE_ID, cue_id, mTesoreriaConstantes.BCO_ID, bco_id);
          Cairo.Database.getData(mTesoreriaConstantes.BANCO, mTesoreriaConstantes.BCO_ID, bco_id, mTesoreriaConstantes.BCO_NAME, bco_nombre);

        }

        var iProp = null;
        iProp = getBanco();
        iProp.setValue(bco_nombre);
        iProp.setSelectId(bco_id);
        m_dialog.showValue(iProp);

        var objAbm = null;
        objAbm = m_dialog;
        objAbm.ValidateProp(iProp, mTesoreriaConstantes.BCO_ID);

        m_lastBcoId = bco_id;
        m_lastBcoName = bco_nombre;
      };

      return self;
    };

    Edit.Controller = { getEditor: createObject };
  });

  Cairo.module("XxxxListDoc.Edit", function(Edit, Cairo, Backbone, Marionette, $, _) {

    var createObject = function() {

      var self = {};

      var getText = Cairo.Language.getText;
      var P = Cairo.Promises;
      var NO_ID = Cairo.Constants.NO_ID;
      var DB = Cairo.Database;
      var D = Cairo.Documents;
      var M = Cairo.Modal;
      var C = Cairo.General.Constants;
      var Types = Cairo.Constants.Types;
      var Dialogs = Cairo.Dialogs;
      var T = Dialogs.PropertyType;
      var val = Cairo.Util.val;
      var isDate = Cairo.Util.isDate;
      var getDateValue = Cairo.Util.getDateValue;
      var today = Cairo.Dates.today;
      var valField = DB.valField;
      var CS = Cairo.Security.Actions.Compras;

      var C_MODULE = "cDepositoBancoListDoc";

      var C_FECHAINI = "FechaIni";
      var C_FECHAFIN = "FechaFin";

      var C_IMG_TASK = 1;


      var K_FECHAINI = 1;
      var K_FECHAFIN = 2;
      var K_BCO_ID = 4;
      var K_CUE_ID = 5;
      var K_EST_ID = 6;
      var K_SUC_ID = 7;
      var K_DOC_ID = 9;

      var K_EMP_ID = 100;
      var m_fechaIni = null;
      var m_fechaFin = null;
      var m_bcoId = "";
      var m_banco = "";
      var m_cueId = "";
      var m_cuenta = "";
      var m_estId = "";
      var m_estado = "";
      var m_sucId = "";
      var m_sucursal = "";
      var m_docId = "";
      var m_documento = "";

      var m_empId = "";
      var m_empresa = "";
      var m_fechaIniV = "";
      var m_fechaFinV = "";


      var m_dialog;
      var m_properties;

      var m_listController;

      var m_menuLoaded;

      var m_title = "";

      var m_menuShowNotes = 0;
      var m_menuAddNote = 0;
      var m_menuShowAsiento = 0;
      var m_menuSign = 0;

      var m_apiPath = DB.getAPIVersion();
      var SAVE_ERROR = getText(2238, ""); // Error al grabar los párametros de navegación de Xxxx

      self.list = function() {
        initialize();
        return load()
          .whenSuccess(loadCollection);
      };

      self.edit = function(xxId) {
        m_listController.edit(xxId);
      };

      self.deleteItem = function(xxId) {
        return m_listController.destroy(xxId);
      };

      self.showDocDigital = function() {
        var _rtn = null;

        try {

          var xxId = m_dialog.getId();
          if(xxId === NO_ID) { return _rtn; }

          var doc = new Cairo.DocDigital();

          doc.setClientTable(CX.TABLE_NAME_XXXX);
          doc.setClientTableID(xxId);

          _rtn = doc.showDocs(Cairo.Database);

        }
        catch(ex) {
          Cairo.manageErrorEx(ex.message, ex, "showDocDigital", C_MODULE, "");
        }

        return _rtn;
      };
      var loadCollection = function() {
        var c;

        m_properties.clear();

        c = m_properties.add(null, C_FECHAINI);
        c.setType(T.date);
        c.setName(getText(1203, "")); // Fecha desde
        c.setKey(K_FECHAINI);
        c.setValue((m_fechaIniV !== "") ? m_fechaIniV : m_fechaIni);

        c = m_properties.add(null, C_FECHAFIN);
        c.setType(T.date);
        c.setName(getText(1204, "")); // Fecha hasta
        c.setKey(K_FECHAFIN);
        c.setValue((m_fechaFinV !== "") ? m_fechaFinV : m_fechaFin);

        c = m_properties.add(null, C.PROV_ID);
        c.setType(T.select);
        c.setSelectTable(Cairo.Tables.PROVEEDOR);
        c.setName(getText(1151, "")); // Proveedor
        c.setKey(K_PROV_ID);
        c.setValue(m_proveedor);
        c.setSelectId(val(m_provId));
        c.setSelectIntValue(m_provId);

        c = m_properties.add(null, C.EST_ID);
        c.setType(T.select);
        c.setSelectTable(Cairo.Tables.ESTADOS);
        c.setName(getText(1568, "")); // Estado
        c.setKey(K_EST_ID);
        c.setValue(m_estado);
        c.setSelectId(val(m_estId));
        c.setSelectIntValue(m_estId);

        c = m_properties.add(null, C.CCOS_ID);
        c.setType(T.select);
        c.setSelectTable(Cairo.Tables.CENTROS_DE_COSTO);
        c.setName(getText(1057, "")); // Centro de Costos
        c.setKey(K_CCOS_ID);
        c.setValue(m_centroCosto);
        c.setSelectId(val(m_ccosId));
        c.setSelectIntValue(m_ccosId);

        c = m_properties.add(null, C.SUC_ID);
        c.setType(T.select);
        c.setSelectTable(Cairo.Tables.SUCURSAL);
        c.setName(getText(1281, "")); // Sucursal
        c.setKey(K_SUC_ID);
        c.setValue(m_sucursal);
        c.setSelectId(val(m_sucId));
        c.setSelectIntValue(m_sucId);

        c = m_properties.add(null, C.DOC_ID);
        c.setType(T.select);
        c.setSelectTable(Cairo.Tables.DOCUMENTO);
        c.setName(getText(1567, "")); // Documentos
        c.setKey(K_DOC_ID);
        c.setValue(m_documento);
        c.setSelectId(val(m_docId));
        c.setSelectIntValue(m_docId);
        c.setSelectFilter(D.FACTURA_COMPRAS_LIST_DOC_FILTER);

        c = m_properties.add(null, C.CPG_ID);
        c.setType(T.select);
        c.setSelectTable(Cairo.Tables.CONDICIONES_DE_PAGO);
        c.setName(getText(1395, "")); // Condicion de pago
        c.setKey(K_CPG_ID);
        c.setValue(m_condicionPago);
        c.setSelectId(val(m_cpgId));
        c.setSelectIntValue(m_cpgId);

        c = m_properties.add(null, C.EMP_ID);
        c.setType(T.select);
        c.setSelectTable(Cairo.Tables.EMPRESA);
        c.setName(getText(1114, "")); // Empresa
        c.setKey(K_EMP_ID);
        c.setValue(m_empresa);
        c.setSelectId(val(m_empId));
        c.setSelectIntValue(m_empId);

        createMenu();
        if(!m_dialog.showDocumentList(self)) { return false; }

        return true;
      };
      var loadCollection = function() {
        var c = null;
        var o = null;
        var value = null;
        var bExists = null;

        m_dialog.getProperties().clear();

        c = m_dialog.getProperties().add(null, C_FECHAINI);
        c.setType(Dialogs.PropertyType.date);
        // Fecha desde
        c.setName(getText(1203, ""));
        c.setKey(K_FECHAINI);
        if(LenB(m_fechaIniV)) {
          c.setValue(m_fechaIniV);
        }
        else {
          c.setValue(m_fechaIni);
        }

        c = m_dialog.getProperties().add(null, C_FECHAFIN);
        c.setType(Dialogs.PropertyType.date);
        // Fecha hasta
        c.setName(getText(1204, ""));
        c.setKey(K_FECHAFIN);
        if(LenB(m_fechaFinV)) {
          c.setValue(m_fechaFinV);
        }
        else {
          c.setValue(m_fechaFin);
        }

        c = m_dialog.getProperties().add(null, mTesoreriaConstantes.BCO_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setSelectTable(Cairo.Tables.BANCO);
        // Banco
        c.setName(getText(1122, ""));
        c.setKey(K_BCO_ID);
        value = m_banco;
        if(m_bcoId.Substring(0, 1).toUpperCase() === KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.BANCO, Cairo.Util.val(m_bcoId.Substring(2)), bExists);
          if(!bExists) { m_bcoId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_bcoId));
        c.setSelectIntValue(m_bcoId);

        c = m_dialog.getProperties().add(null, mTesoreriaConstantes.CUE_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setSelectTable(Cairo.Tables.CUENTA);
        // Cuenta
        c.setName(getText(1267, ""));
        c.setKey(K_CUE_ID);
        value = m_cuenta;
        if(m_cueId.Substring(0, 1).toUpperCase() === KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.CUENTA, Cairo.Util.val(m_cueId.Substring(2)), bExists);
          if(!bExists) { m_cueId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_cueId));
        c.setSelectIntValue(m_cueId);

        c = m_dialog.getProperties().add(null, C.EST_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setSelectTable(csEstado);
        // Estado
        c.setName(getText(1568, ""));
        c.setKey(K_EST_ID);
        value = m_estado;
        if(m_estId.Substring(0, 1).toUpperCase() === KEY_NODO) {
          value = GetNombreRama(csEstado, Cairo.Util.val(m_estId.Substring(2)), bExists);
          if(!bExists) { m_estId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_estId));
        c.setSelectIntValue(m_estId);

        c = m_dialog.getProperties().add(null, mTesoreriaConstantes.SUC_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setSelectTable(Cairo.Tables.SUCURSAL);
        // Sucursal
        c.setName(getText(1281, ""));
        c.setKey(K_SUC_ID);
        value = m_sucursal;
        if(m_sucId.Substring(0, 1).toUpperCase() === KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.SUCURSAL, Cairo.Util.val(m_sucId.Substring(2)), bExists);
          if(!bExists) { m_sucId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_sucId));
        c.setSelectIntValue(m_sucId);

        c = m_dialog.getProperties().add(null, mTesoreriaConstantes.DOC_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setSelectTable(csETablasDocumento.CSDocumento);
        // Documentos
        c.setName(getText(1567, ""));
        c.setKey(K_DOC_ID);
        value = m_documento;
        if(m_docId.Substring(0, 1).toUpperCase() === KEY_NODO) {
          value = GetNombreRama(csETablasDocumento.CSDocumento, Cairo.Util.val(m_docId.Substring(2)), bExists);
          if(!bExists) { m_docId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_docId));
        c.setSelectIntValue(m_docId);
        c.setSelectFilter("'{emp_id=0}doct_id = "+ csEDocumentoTipo.cSEDT_DEPOSITOBANCO.toString()+ "'");


        c = m_dialog.getProperties().add(null, C.EMP_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setSelectTable(Cairo.Tables.EMPRESA);
        // Empresa
        c.setName(getText(1114, ""));
        c.setKey(K_EMP_ID);
        value = m_empresa;
        if(m_empId.Substring(0, 1).toUpperCase() === KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.EMPRESA, Cairo.Util.val(m_empId.Substring(2)), bExists);
          if(!bExists) { m_empId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_empId));
        c.setSelectIntValue(m_empId);

        createMenu();
        if(!m_dialog.showDocumentList(self)) { return false; }

        return true;
      };

      var refreshCollection = function() {
        return m_dialog.showValues(m_properties);
      };

      var load = function() {

        return DB.getData("load[" + m_apiPath + "general/depositobancolistdoc]", id).then(
          function(response) {


            m_empId = Cairo.Company.getId();
            m_empresa = Cairo.Company.getName();

            if(response.success !== true) { return false; }

            if(response.data.id === NO_ID) {

              m_fechaIniV = "";
              m_fechaIni = Cairo.Dates.today();
              m_fechaFinV = "";
              m_fechaFin = Cairo.Dates.DateNames.getDateByName('h-60');

              m_bcoId = NO_ID;
              m_banco = "";
              m_cueId = NO_ID;
              m_cuenta = "";
              m_estId = NO_ID;
              m_estado = "";
              m_sucId = NO_ID;
              m_sucursal = "";
              m_docId = NO_ID;
              m_documento = "";

            }
            else {

              m_fechaIniV = valField(response.data, C.FROM);
              m_fechaIni = valField(response.data, C.FROM);
              m_fechaIni = isDate(m_fechaIni) ? getDateValue(m_fechaIni) : today();

              m_fechaFinV = valField(response.data, C.TO);
              m_fechaFin = valField(response.data, C.TO);
              m_fechaFin = isDate(m_fechaFin) ? getDateValue(m_fechaFin) : today();

              m_provId = valField(response.data, C.PROV_ID);
              m_estId = valField(response.data, C.EST_ID);
              m_ccosId = valField(response.data, C.CCOS_ID);
              m_sucId = valField(response.data, C.SUC_ID);
              m_docId = valField(response.data, C.DOC_ID);
              m_cpgId = valField(response.data, C.CPG_ID);
              m_empId = valField(response.data, C.EMP_ID);

              m_proveedor = valField(response.data, C.PROV_NAME);
              m_estado = valField(response.data, C.EST_NAME);
              m_centroCosto = valField(response.data, C.CCOS_NAME);
              m_sucursal = valField(response.data, C.SUC_NAME);
              m_documento = valField(response.data, C.DOC_NAME);
              m_condicionPago = valField(response.data, C.CPG_NAME);
              m_empresa = valField(response.data, C.EMP_NAME);
            }

            return true;
          });
      };

      self.getApplication = function() {
        return Cairo.Application.getName();
      };

      self.getProperties = function() {
        return m_properties;
      };

      self.propertyChange = function(key) {
        var iProp = null;

        switch (key) {

          case K_FECHAINI:

            iProp = m_dialog.getProperties().item(C_FECHAINI);

            if(iProp.getSelectIntValue() !== "") {
              m_fechaIniV = iProp.getSelectIntValue();
              m_fechaIni = Cairo.Dates.DateNames.getDateByName(m_fechaIniV);
            }
            else if(isDate(iProp.getValue())) {
              m_fechaIniV = "";
              m_fechaIni = iProp.getValue();
            }
            else {
              m_fechaIniV = "";
              iProp.setValue(m_fechaIni);
            }

            break;

          case K_FECHAFIN:

            iProp = m_dialog.getProperties().item(C_FECHAFIN);

            if(iProp.getSelectIntValue() !== "") {
              m_fechaFinV = iProp.getSelectIntValue();
              m_fechaFin = Cairo.Dates.DateNames.getDateByName(m_fechaFinV);
            }
            else if(isDate(iProp.getValue())) {
              m_fechaFinV = "";
              m_fechaFin = iProp.getValue();
            }
            else {
              m_fechaFinV = "";
              iProp.setValue(m_fechaFin);
            }

            break;

          case K_EST_ID:
            var property = m_dialog.getProperties().item(C.EST_ID);
            m_estado = property.getValue();
            m_estId = property.getSelectIntValue();

            break;

          case K_BCO_ID:
            var property = m_dialog.getProperties().item(mTesoreriaConstantes.BCO_ID);
            m_banco = property.getValue();
            m_bcoId = property.getSelectIntValue();

            break;

          case K_CUE_ID:
            var property = m_dialog.getProperties().item(mTesoreriaConstantes.CUE_ID);
            m_cuenta = property.getValue();
            m_cueId = property.getSelectIntValue();

            break;

          case K_SUC_ID:
            var property = m_dialog.getProperties().item(mTesoreriaConstantes.SUC_ID);
            m_sucursal = property.getValue();
            m_sucId = property.getSelectIntValue();

            break;

          case K_DOC_ID:
            var property = m_dialog.getProperties().item(mTesoreriaConstantes.DOC_ID);
            m_documento = property.getValue();
            m_docId = property.getSelectIntValue();


            break;

          case K_EMP_ID:
            var property = m_dialog.getProperties().item(C.EMP_ID);
            m_empresa = property.getValue();
            m_empId = property.getSelectIntValue();
            break;
        }

        return true;
      };

      self.refresh = function() {

        var startDate;
        if(Cairo.Dates.DateNames.getDateNames().contains(m_fechaIniV)) {
          startDate = Cairo.Dates.DateNames.getDateByName(m_fechaIniV);
        }
        else {
          startDate = m_fechaIni
        }

        var endDate;
        if(Cairo.Dates.DateNames.getDateNames().contains(m_fechaFinV)) {
          endDate = Cairo.Dates.DateNames.getDateByName(m_fechaFinV);
        }
        else {
          endDate = m_fechaFin
        }

        endDate = Cairo.Dates.DateNames.addToDate("d", 1, endDate);

        startDate = DB.sqlDate(startDate);
        endDate = DB.sqlDate(endDate);

        var params = {
          from: startDate,
          to: endDate,
          provId: m_provId,
          estId: m_estId,
          ccosId: m_ccosId,
          sucId: m_sucId,
          docId: m_docId,
          cpgId: m_cpgId,
          empId: m_empId
        };

        return DB.getData("load[" + m_apiPath + "compras/facturacompras]", null, params);
      };
      var cIABMListDocClient_Refresh = function() {
        var sqlstmt = null;

        sqlstmt = "sp_lsdoc_DepositoBancos ";

        sqlstmt = sqlstmt+ Cairo.Database.getUserId().toString()+ ",";

        if(!cDate.getDateNames(m_fechaIniV) === null) {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(Cairo.Dates.DateNames.getDateByName(m_fechaIniV))+ ",";
        }
        else {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(m_fechaIni)+ ",";
        }

        if(!cDate.getDateNames(m_fechaFinV) === null) {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(Cairo.Dates.DateNames.getDateByName(m_fechaFinV))+ ",";
        }
        else {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(m_fechaFin)+ ",";
        }

        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_bcoId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_cueId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_estId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_sucId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_docId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_empId);

        return sqlstmt;
      };

      self.save = function() {

        var register = new DB.Register();
        var fields = register.getFields();

        register.setFieldId(C.LDP_ID);
        register.setTable(C.LISTA_DOCUMENTO_PARAMETRO);

        register.setPath(m_apiPath + "compras/facturacompras");

        register.setId(Cairo.Constants.NEW_ID);

        var _count = m_dialog.getProperties().size();
        for(var _i = 0; _i < _count; _i++) {

          var property = m_dialog.getProperties().item(_i);

          switch (property.getKey()) {

            case K_FECHAINI:
              var value = property.getSelectIntValue();
              if(value === "") { value = property.getValue(); }
              fields.add(C.FROM, value, Types.text);
              break;

            case K_FECHAFIN:
              var value = property.getSelectIntValue();
              if(value === "") { value = property.getValue(); }
              fields.add(C.TO, value, Types.text);
              break;

            case K_PROV_ID:
              fields.add(C.PROV_ID, property.getSelectIntValue(), Types.text);
              break;

            case K_EST_ID:
              fields.add(C.EST_ID, property.getSelectIntValue(), Types.text);
              break;

            case K_CCOS_ID:
              fields.add(C.CCOS_ID, property.getSelectIntValue(), Types.text);
              break;

            case K_SUC_ID:
              fields.add(C.SUC_ID, property.getSelectIntValue(), Types.text);
              break;

            case K_DOC_ID:
              fields.add(C.DOC_ID, property.getSelectIntValue(), Types.text);
              break;

            case K_CPG_ID:
              fields.add(C.CPG_ID, property.getSelectIntValue(), Types.text);
              break;

            case K_EMP_ID:
              fields.add(C.EMP_ID, property.getSelectIntValue(), Types.text);
              break;

          }
        }

        return DB.saveEx(
            register,
            false,
            "",
            Cairo.Constants.CLIENT_SAVE_FUNCTION,
            C_MODULE,
            SAVE_ERROR).then(

          function(result) {
            if(result.success) {
              return load(result.data.getId()).then(
                function (success) {
                  if(success) {
                    refreshCollection();
                  };
                  return success;
                }
              );
            }
            else {
              return false;
            }
          }
        );
      };

      var cIABMListDocClient_Save = function() {

        var strError = null;

        strError = getText(2238, "");
        //Error al grabar los párametros de navegación del Depósito Bancario

        var register = null;
        var register = new DB.Register();

        var sqlstmt = null;

        sqlstmt = "delete ListaDocumentoParametro  where pre_id = "+ csTesoreriaPrestacion.cSPRETSRLISTDEPOSITOBANCO.toString()+ " and us_id = "+ m_us_id+ " and (emp_id is null or emp_id = "+ cUtil.getEmpId().toString()+ ")";

        if(!Cairo.Database.execute(sqlstmt, "cIABMClient_Save", C_MODULE, strError)) { return false; }

        register.setTable(Cairo.Constants.LISTADOCUMENTOPARAMETRO);
        register.setUtilizaIdentity(true);

        var property = null;
        var _count = m_dialog.getProperties().size();
        for(var _i = 0; _i < _count; _i++) {
          property = m_dialog.getProperties().item(_i);

          register.getFields().clear();

          switch (property.getKey()) {

            case K_FECHAINI:
              if(property.getSelectIntValue() !== "") {
                fields.add(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              }
              else {
                fields.add(Cairo.Constants.LDP_VALOR, property.getValue(), Cairo.Constants.Types.text);
              }

              fields.add(Cairo.Constants.LDP_ORDEN, 10, Cairo.Constants.Types.integer);
              fields.add(Cairo.Constants.LDP_ID, K_FECHAINI, Cairo.Constants.Types.integer);

              break;

            case K_FECHAFIN:

              if(property.getSelectIntValue() !== "") {
                fields.add(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              }
              else {
                fields.add(Cairo.Constants.LDP_VALOR, property.getValue(), Cairo.Constants.Types.text);
              }

              fields.add(Cairo.Constants.LDP_ORDEN, 20, Cairo.Constants.Types.integer);
              fields.add(Cairo.Constants.LDP_ID, K_FECHAFIN, Cairo.Constants.Types.integer);

              break;

            case K_BCO_ID:
              fields.add(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              fields.add(Cairo.Constants.LDP_ORDEN, 40, Cairo.Constants.Types.integer);
              fields.add(Cairo.Constants.LDP_ID, K_BCO_ID, Cairo.Constants.Types.integer);
              break;

            case K_CUE_ID:
              fields.add(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              fields.add(Cairo.Constants.LDP_ORDEN, 40, Cairo.Constants.Types.integer);
              fields.add(Cairo.Constants.LDP_ID, K_CUE_ID, Cairo.Constants.Types.integer);
              break;

            case K_EST_ID:
              fields.add(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              fields.add(Cairo.Constants.LDP_ORDEN, 50, Cairo.Constants.Types.integer);
              fields.add(Cairo.Constants.LDP_ID, K_EST_ID, Cairo.Constants.Types.integer);
              break;

            case K_SUC_ID:
              fields.add(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              fields.add(Cairo.Constants.LDP_ORDEN, 70, Cairo.Constants.Types.integer);
              fields.add(Cairo.Constants.LDP_ID, K_SUC_ID, Cairo.Constants.Types.integer);
              break;

            case K_DOC_ID:
              fields.add(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              fields.add(Cairo.Constants.LDP_ORDEN, 90, Cairo.Constants.Types.integer);
              fields.add(Cairo.Constants.LDP_ID, K_DOC_ID, Cairo.Constants.Types.integer);


              break;

            case K_EMP_ID:
              fields.add(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              fields.add(Cairo.Constants.LDP_ORDEN, 100, Cairo.Constants.Types.integer);
              fields.add(Cairo.Constants.LDP_ID, K_EMP_ID, Cairo.Constants.Types.integer);

              break;
          }


          fields.add(C.EMP_ID, cUtil.getEmpId(), Cairo.Constants.Types.id);

          fields.add(Cairo.Constants.US_ID, m_us_id, Cairo.Constants.Types.id);
          fields.add(C.PRE_ID, csTesoreriaPrestacion.cSPRETSRLISTDEPOSITOBANCO, Cairo.Constants.Types.id);



          if(!Cairo.Database.save(register, , "cIABMClient_Save", C_MODULE, strError)) { return false; }
        }

        if(!load(m_us_id)) { return false; }

        return true;
      };

      self.getTitle = function() {
        return m_title;
      };

      self.validate = function() {
        return P.resolvedPromise(true);
      };


      var setCIEditGenericListDoc_ObjAbm = function(rhs) {
        m_dialog = rhs;
      };


      var initialize = function() {
        try {
          m_title = getText(1892, ""); // Facturas de Compras
          m_dialog.setHaveDetail(true);
          m_dialog.setStartRowText(4);
        }
        catch(ex) {
          Cairo.manageErrorEx(ex.message, ex, "initialize", C_MODULE, "");
        }
      };

      var initialize = function() {
        try {

          // Depósitos Bancarios
          m_title = getText(2130, "");

          m_properties = new cABMDocProperties();
          //Set .ImageList = fResource.iList
          m_properties.setHaveDetail(true);
          m_properties.setStartRowText(4);

          var elem = m_properties.add(null, "TypeTask");
          elem.setName("TypeTask");
          elem.setCaption(" ");
          var elem = row.add(null);
          elem.FormulaType = csConditionType.cSCONDTNONE;
          elem.IconIndex = C_IMG_TASK;
          elem.setWidth(500);
          elem.setSortType(csSortType.cSSRTTICON);

          var elem = m_properties.add(null, "Descripción");
          elem.setName("Descripción");
          elem.setFontName("Tahoma");
          elem.setFontSize(8);
          elem.setForeColor(vbBlue);


        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, ex, "destroy", C_MODULE, "");

        }

      };

      self.destroy = function() {
        try {
          m_dialog = null;
          m_properties = null;
          m_listController = null;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, ex, "destroy", C_MODULE, "");
        }
      };

      self.destroy = function() {
        try {

          m_dialog = null;
          m_properties = null;


        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, ex, "destroy", C_MODULE, "");

        }

      };

      var createMenu = function() {


        if(m_menuLoaded) { return; }

        m_menuLoaded = true;

        m_objList.ObjClientMenu = self;
        m_objList.ClearMenu;
        // Firmar
        m_menuSign = m_objList.addMenu(getText(1594, ""));
        m_objList.addMenu("-");
        // Agregar Nota
        m_menuAddNote = m_objList.addMenu(getText(1615, ""));
        // Ver Notas
        m_menuShowNotes = m_objList.addMenu(getText(1616, ""));
        m_objList.addMenu("-");
        // Ver Asiento Contable
        m_menuShowAsiento = m_objList.addMenu(getText(1692, ""));
      };

      var showNotes = function() {
        var fcId = m_dialog.getId();
        return DB.getData("load[" + m_apiPath + "modulexxxx/xxxx/notes]", fcId)
          .whenSuccessWithResult(D.showNotes);
      };

      var addNote = function() {
        var xxId = m_dialog.getId();
        return D.addNote(D.Types.TYPEXXXX, xxId, false);
      };

      var signDocument = function() {

        var fcId = m_dialog.getId();

        if(fcId === NO_ID) {
          return P.resolvedPromise();
        }

        var refreshRow = function(response) {
          m_dialog.refreshRow(response.data);
        };

        var getAction = function(response) {
          var p = null;

          if(response.signed) {
            p = M.confirmViewYesDefault(
              getText(1594, ""), // Firmar
              getText(1593, "")  // El documento ya ha sido firmado desea borrar la firma
            );
          }
          return p || P.resolvedPromise(true);
        };

        var p = D.getDocumentSignStatus(D.Types.FACTURA_COMPRA, fcId)
            .whenSuccessWithResult(getAction)
            .whenSuccess(D.signDocument(D.Types.FACTURA_COMPRA, fcId))
            .whenSuccessWithResult(refreshRow)
          ;

        return p;
      };

      var showAsiento = function() {
        var fcId = m_dialog.getId();
        if(fcId !== NO_ID) {

          D.getAsientoId(D.Types.FACTURA_COMPRA, fcId).whenSuccessWithResult(function(response) {
            D.showDocAux(response.as_id, "Asiento");
          });
        }
      };

      return self;
    };

    Edit.Controller = { getEditor: createObject };

  });

  Cairo.module("Xxxx.List", function(List, Cairo, Backbone, Marionette, $, _) {

    var NO_ID = Cairo.Constants.NO_ID;
    var DB = Cairo.Database;
    var C_MODULE = "cXxxx";
    var P = Cairo.Promises;

    List.Controller = {
      list: function() {

        var self = this;

        /*
         this function will be called by the tab manager every time the
         view must be created. when the tab is not visible the tab manager
         will not call this function but only make the tab visible
         */
        var createListDialog = function(tabId) {

          var editors = Cairo.Editors.xxxxEditors || Cairo.Collections.createCollection(null);
          Cairo.Editors.xxxxEditors = editors;

          // ListController properties and methods
          //
          self.entityInfo = new Backbone.Model({
            entitiesTitle: "Xxxx",
            entityName: "xxxx",
            entitiesName: "xxxxs"
          });

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
            if(id === NO_ID) {
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

          self.edit = function(id) {
            var key = getKey(id);
            if(editors.contains(key)) {
              editors.item(key).dialog.showDialog();
            }
            else {
              Cairo.LoadingMessage.show("Xxxx", "Loading Xxxxs from Crowsoft Cairo server.");

              var editor = Cairo.Xxxx.Edit.Controller.getEditor();
              var dialog = Cairo.Dialogs.Views.Controller.newDialog();
              var dialogItems = Cairo.Dialogs.Views.Controller.newDialog();
              var dialogFooter = Cairo.Dialogs.Views.Controller.newDialog();

              editor.setListController(self);
              editor.setDialog(dialog);
              editor.setItems(dialogItems);
              editor.setFooter(dialogFooter);
              editor.edit(id).then(Cairo.LoadingMessage.close);

              editors.add({editor: editor, dialog: dialog}, key);
            }
          };

          self.destroy = function(id) {
            if(!Cairo.Security.hasPermissionTo(Cairo.Security.Actions.Modulexxxx.DELETE_XXXX)) {
              return P.resolvedPromise(false);
            }

            var closeDialog = function() {
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
            };

            return DB.destroy(
              DB.getAPIVersion() + "modulexxxx/xxxx", id,
              Cairo.Constants.DELETE_FUNCTION, C_MODULE).whenSuccess(closeDialog, false);
          };

          // progress message
          //
          Cairo.LoadingMessage.show("Xxxx", "Loading Xxxxs from Crowsoft Cairo server.");

          self.documentList = Cairo.XxxxListDoc.Edit.Controller.getEditor();
          var dialog = Cairo.Dialogs.Views.ListController.newDialogList();

          self.documentList.setListController(self);
          self.documentList.setDialog(dialog);
          self.documentList.list().then(Cairo.LoadingMessage.close);

        };

        createListDialog();
      }
    };
  });

}());