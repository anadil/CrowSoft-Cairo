(function() {
  "use strict";

  Cairo.module("Xxxx.Edit", function(Edit, Cairo, Backbone, Marionette, $, _) {

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

      var C_MODULE = "cPedidoVtaListDoc";

      var C_VM_ID = 0;
      var C_VM_MENU_ID = 1;
      var C_VM_IS_CONTADO = 2;
      var C_VM_CUE_ID = 3;

      var C_FECHAINI = "FechaIni";
      var C_FECHAFIN = "FechaFin";

      var C_IMG_TASK = 1;

      // ACA VAN LAS K GENERADAS POR EL ASISTENTE.
      var K_FECHAINI = 1;
      var K_FECHAFIN = 2;
      var K_CLI_ID = 4;
      var K_EST_ID = 5;
      var K_CCOS_ID = 6;
      var K_SUC_ID = 7;
      var K_VEN_ID = 8;
      var K_DOC_ID = 9;
      var K_CPG_ID = 10;
      // empid
      var K_EMP_ID = 100;
      var m_fechaIni = null;
      var m_fechaFin = null;
      var m_cliId = "";
      var m_cliente = "";
      var m_estId = "";
      var m_estado = "";
      var m_ccosId = "";
      var m_centroCosto = "";
      var m_sucId = "";
      var m_sucursal = "";
      var m_ven_id = "";
      var m_vendedor = "";
      var m_docId = "";
      var m_documento = "";
      var m_cpgId = "";
      var m_condicionPago = "";
      // empid
      var m_empId = "";
      var m_empresa = "";
      var m_fechaIniV = "";
      var m_fechaFinV = "";

      // ACA VAN LAS m_ GENERADAS POR EL ASISTENTE.

      //OJO HASTA ACA

      var m_dialog;
      var m_us_id = 0;
      var m_properties;

      var m_title = "";

      var m_menuLoaded;

      var m_menuShowRemito = 0;
      var m_menuShowPacking = 0;
      var m_menuShowFactura = 0;

      var m_menuShowMensajes = 0;
      var m_menuShowInfoCli = 0;
      var m_menuAddNote = 0;
      var m_menuShowAplic = 0;
      var m_menuFirmar = 0;
      var m_menuShowFacturaAuto = 0;
      var m_menuEditCliente = 0;

      var m_vMenuModoPago = 0;

      var m_objApply;

      var m_apiPath = DB.getAPIVersion();

      self.getEnabledSearchParam = function() {
        return true;
      };

      self.getSearchParamTable = function() {
        return Cairo.Tables.CLIENTE;
      };

      self.getBackgroundColor = function() {
        return RGB(&HFF, &HAA, &H0);
      };


      self.setSearchParam = function(id,  name) {
        // **TODO:** on error resume next found !!!
        var property = m_dialog.getProperties().item(mPedidoConstantes.CLI_ID);
        property.setValue(name);
        property.setSelectId(id);
        property.setHelpValueProcess(id);
        var abmGen = null;
        abmGen = m_dialog;
        abmGen.ShowValue(m_dialog.getProperties().item(mPedidoConstantes.CLI_ID));
      };

      self.processMenu = function(index) {
        try {

          switch (index) {

            case m_menuShowFactura:
              pShowFactura(false, false, NO_ID, false);

              break;

            case m_menuShowFacturaAuto:
              pShowFactura(true, false, NO_ID, false);

              break;

            case m_menuShowPacking:
              pShowPacking();

              break;

            case m_menuShowRemito:
              pShowRemito();

              break;

            case m_menuShowInfoCli:
              HelpShowInfo(Cairo.Tables.CLIENTE, pGetCliId());

              break;

            case m_menuShowMensajes:
              showNotes();

              break;

            case m_menuAddNote:
              addNote();

              break;

            case m_menuShowAplic:
              pShowApply();

              break;

            case m_menuFirmar:
              pFirmar();

              break;

            case m_menuEditCliente:
              pEditCliente();

              break;

            default:
              pProcessModoPago(index);

              break;
          }

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "ProcessMenu", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
      };



      var loadCollection = function() {
        var c = null;
        var o = null;
        var value = null;
        var bExists = null;

        m_dialog.getProperties().clear();

        c = m_dialog.getProperties().add(null, C_FECHAINI);
        c.setType(Dialogs.PropertyType.date);
        //'Fecha desde
        c.setName(Cairo.Language.getText(1203, ""));
        c.setKey(K_FECHAINI);
        if(m_fechaIniV != "") {
          c.setValue(m_fechaIniV);
        }
        else {
          c.setValue(m_fechaIni);
        }

        c = m_dialog.getProperties().add(null, C_FECHAFIN);
        c.setType(Dialogs.PropertyType.date);
        //'Fecha hasta
        c.setName(Cairo.Language.getText(1204, ""));
        c.setKey(K_FECHAFIN);
        if(m_fechaFinV != "") {
          c.setValue(m_fechaFinV);
        }
        else {
          c.setValue(m_fechaFin);
        }

        c = m_dialog.getProperties().add(null, mPedidoConstantes.CLI_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(Cairo.Tables.CLIENTE);
        //'Cliente
        c.setName(Cairo.Language.getText(1150, ""));
        c.setKey(K_CLI_ID);
        value = m_cliente;
        if(m_cliId.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.CLIENTE, Cairo.Util.val(m_cliId.Substring(2)), bExists);
          if(!bExists) { m_cliId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_cliId));
        c.setHelpValueProcess(m_cliId);

        c = m_dialog.getProperties().add(null, Cairo.Constants.EST_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(csEstado);
        //'Estado
        c.setName(Cairo.Language.getText(1568, ""));
        c.setKey(K_EST_ID);
        value = m_estado;
        if(m_estId.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(csEstado, Cairo.Util.val(m_estId.Substring(2)), bExists);
          if(!bExists) { m_estId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_estId));
        c.setHelpValueProcess(m_estId);

        c = m_dialog.getProperties().add(null, mPedidoConstantes.CCOS_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(Cairo.Tables.CENTROCOSTO);
        //'Centro de Costos
        c.setName(Cairo.Language.getText(1057, ""));
        c.setKey(K_CCOS_ID);
        value = m_centroCosto;
        if(m_ccosId.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.CENTROCOSTO, Cairo.Util.val(m_ccosId.Substring(2)), bExists);
          if(!bExists) { m_ccosId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_ccosId));
        c.setHelpValueProcess(m_ccosId);

        c = m_dialog.getProperties().add(null, mPedidoConstantes.SUC_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(Cairo.Tables.SUCURSAL);
        //'Sucursal
        c.setName(Cairo.Language.getText(1281, ""));
        c.setKey(K_SUC_ID);
        value = m_sucursal;
        if(m_sucId.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.SUCURSAL, Cairo.Util.val(m_sucId.Substring(2)), bExists);
          if(!bExists) { m_sucId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_sucId));
        c.setHelpValueProcess(m_sucId);

        c = m_dialog.getProperties().add(null, mPedidoConstantes.VEN_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(Cairo.Tables.VENDEDORES);
        //'Vendedores
        c.setName(Cairo.Language.getText(1502, ""));
        c.setKey(K_VEN_ID);
        value = m_vendedor;
        if(m_ven_id.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.VENDEDORES, Cairo.Util.val(m_ven_id.Substring(2)), bExists);
          if(!bExists) { m_ven_id = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_ven_id));
        c.setHelpValueProcess(m_ven_id);

        c = m_dialog.getProperties().add(null, mPedidoConstantes.DOC_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(csETablasDocumento.CSDocumento);
        //'Documentos
        c.setName(Cairo.Language.getText(1611, ""));
        c.setKey(K_DOC_ID);
        value = m_documento;
        if(m_docId.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(csETablasDocumento.CSDocumento, Cairo.Util.val(m_docId.Substring(2)), bExists);
          if(!bExists) { m_docId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_docId));
        c.setHelpValueProcess(m_docId);
        c.setSelectFilter(pGetDocFilter());

        c = m_dialog.getProperties().add(null, mPedidoConstantes.CPG_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(Cairo.Tables.CONDICIONPAGO);
        //'Condicion de pago
        c.setName(Cairo.Language.getText(1395, ""));
        c.setKey(K_CPG_ID);
        value = m_condicionPago;
        if(m_cpgId.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.CONDICIONPAGO, Cairo.Util.val(m_cpgId.Substring(2)), bExists);
          if(!bExists) { m_cpgId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_cpgId));
        c.setHelpValueProcess(m_cpgId);

        // empid
        c = m_dialog.getProperties().add(null, Cairo.Constants.EMP_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(Cairo.Tables.EMPRESA);
        //'Empresa
        c.setName(Cairo.Language.getText(1114, ""));
        c.setKey(K_EMP_ID);
        value = m_empresa;
        if(m_empId.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.EMPRESA, Cairo.Util.val(m_empId.Substring(2)), bExists);
          if(!bExists) { m_empId = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_empId));
        c.setHelpValueProcess(m_empId);

        createMenu();
        if(!m_dialog.showDocumentList(self)) { return false; }

        return true;
      };

      var refreshCollection = function() {

        m_dialog.setTitle(m_name);

        var properties = m_dialog.getProperties();

        return m_dialog.showValues(properties);
      };

      var load = function() {

        return DB.getData("load[" + m_apiPath + "general/pedidoventalistdoc]", id).then(
          function(response) {

            // empid
            m_empId = Cairo.Company.getId();
            m_empresa = Cairo.Company.getName();

            if(response.success !== true) { return false; }

            if(response.data.id === NO_ID) {

              m_fechaIniV = "";
              m_fechaIni = Cairo.Dates.today();
              m_fechaFinV = "";
              m_fechaFin = Cairo.Dates.DateNames.getDateByName('h-60');

              m_cliId = NO_ID;
              m_cliente = "";
              m_estId = NO_ID;
              m_estado = "";
              m_ccosId = NO_ID;
              m_centroCosto = "";
              m_sucId = NO_ID;
              m_sucursal = "";
              m_ven_id = NO_ID;
              m_vendedor = "";
              m_docId = NO_ID;
              m_documento = "";
              m_cpgId = NO_ID;
              m_condicionPago = "";

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

      self.getAplication = function() {
        return Cairo.appName;
      };

      self.getProperties = function() {
        return m_properties;
      };

      self.propertyChange = function(key) {
        var iProp = null;

        switch (key) {

          case K_FECHAINI:

            iProp = m_dialog.getProperties().item(C_FECHAINI);

            if(LenB(iProp.getSelectIntValue())) {
              m_fechaIniV = iProp.getSelectIntValue();
              m_fechaIni = Cairo.Dates.DateNames.getDateByName(m_fechaIniV);
            }
            else if(IsDate(iProp.getValue())) {
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

            if(LenB(iProp.getSelectIntValue())) {
              m_fechaFinV = iProp.getSelectIntValue();
              m_fechaFin = Cairo.Dates.DateNames.getDateByName(m_fechaFinV);
            }
            else if(IsDate(iProp.getValue())) {
              m_fechaFinV = "";
              m_fechaFin = iProp.getValue();
            }
            else {
              m_fechaFinV = "";
              iProp.setValue(m_fechaFin);
            }

            break;

          case K_EST_ID:
            var property = m_dialog.getProperties().item(Cairo.Constants.EST_ID);
            m_estado = property.getValue();
            m_estId = property.getSelectIntValue();

            break;

          case K_CLI_ID:
            var property = m_dialog.getProperties().item(mPedidoConstantes.CLI_ID);
            m_cliente = property.getValue();
            m_cliId = property.getSelectIntValue();

            break;

          case K_CCOS_ID:
            var property = m_dialog.getProperties().item(mPedidoConstantes.CCOS_ID);
            m_centroCosto = property.getValue();
            m_ccosId = property.getSelectIntValue();

            break;

          case K_SUC_ID:
            var property = m_dialog.getProperties().item(mPedidoConstantes.SUC_ID);
            m_sucursal = property.getValue();
            m_sucId = property.getSelectIntValue();

            break;

          case K_VEN_ID:
            var property = m_dialog.getProperties().item(mPedidoConstantes.VEN_ID);
            m_vendedor = property.getValue();
            m_ven_id = property.getSelectIntValue();

            break;

          case K_DOC_ID:
            var property = m_dialog.getProperties().item(mPedidoConstantes.DOC_ID);
            m_documento = property.getValue();
            m_docId = property.getSelectIntValue();

            break;

          case K_CPG_ID:
            var property = m_dialog.getProperties().item(mPedidoConstantes.CPG_ID);
            m_condicionPago = property.getValue();
            m_cpgId = property.getSelectIntValue();

            // empid
            break;

          case K_EMP_ID:
            var property = m_dialog.getProperties().item(Cairo.Constants.EMP_ID);
            m_empresa = property.getValue();
            m_empId = property.getSelectIntValue();
            break;
        }

        return true;
      };

      var cIABMListDocClient_Refresh = function() {
        var sqlstmt = null;

        sqlstmt = "sp_lsdoc_PedidosVenta ";

        sqlstmt = sqlstmt+ Cairo.Database.getUserId().toString()+ ",";

        if(!cDate.getDateNames(m_fechaIniV) == null) {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(Cairo.Dates.DateNames.getDateByName(m_fechaIniV))+ ",";
        }
        else {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(m_fechaIni)+ ",";
        }

        if(!cDate.getDateNames(m_fechaFinV) == null) {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(Cairo.Dates.DateNames.getDateByName(m_fechaFinV))+ ",";
        }
        else {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(m_fechaFin)+ ",";
        }

        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_cliId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_estId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_ccosId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_sucId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_ven_id)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_docId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_cpgId)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_empId);

        return sqlstmt;
      };

      var cIABMListDocClient_Save = function() {

        var strError = null;

        strError = "Error al grabar los párametros de navegación de Pedidos de Venta";

        var register = null;
        register = new cRegister();

        var sqlstmt = null;

        sqlstmt = "delete ListaDocumentoParametro  where pre_id = "+ csPedidoVtaPrestacion.cSPREPVLISTPEDIDOVTA.toString()+ " and us_id = "+ m_us_id+ " and (emp_id is null or emp_id = "+ cUtil.getEmpId().toString()+ ")";

        if(!Cairo.Database.execute(sqlstmt, "cIABMClient_Save", C_MODULE, strError)) { return false; }

        register.setTable(Cairo.Constants.LISTADOCUMENTOPARAMETRO);
        register.setUtilizaIdentity(true);

        var property = null;
        var _count = m_dialog.getProperties().size();
        for (var _i = 0; _i < _count; _i++) {
          property = m_dialog.getProperties().item(_i);

          register.getFields().clear();

          switch (property.getKey()) {

            case K_FECHAINI:
              if(LenB(property.getSelectIntValue())) {
                register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              }
              else {
                register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getValue(), Cairo.Constants.Types.text);
              }

              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 10, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_FECHAINI, Cairo.Constants.Types.integer);

              break;

            case K_FECHAFIN:
              if(LenB(property.getSelectIntValue())) {
                register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              }
              else {
                register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getValue(), Cairo.Constants.Types.text);
              }

              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 20, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_FECHAFIN, Cairo.Constants.Types.integer);

              break;

            case K_CLI_ID:
              register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 40, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_CLI_ID, Cairo.Constants.Types.integer);
              break;

            case K_EST_ID:
              register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 50, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_EST_ID, Cairo.Constants.Types.integer);
              break;

            case K_CCOS_ID:
              register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 60, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_CCOS_ID, Cairo.Constants.Types.integer);
              break;

            case K_SUC_ID:
              register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 70, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_SUC_ID, Cairo.Constants.Types.integer);
              break;

            case K_VEN_ID:
              register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 80, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_VEN_ID, Cairo.Constants.Types.integer);
              break;

            case K_DOC_ID:
              register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 90, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_DOC_ID, Cairo.Constants.Types.integer);
              break;

            case K_CPG_ID:
              register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 100, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_CPG_ID, Cairo.Constants.Types.integer);

              // empid
              break;

            case K_EMP_ID:
              register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 100, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_EMP_ID, Cairo.Constants.Types.integer);

              break;
          }

          // empid
          register.getFields().add2(Cairo.Constants.EMP_ID, cUtil.getEmpId(), Cairo.Constants.Types.id);

          register.getFields().add2(Cairo.Constants.US_ID, m_us_id, Cairo.Constants.Types.id);
          register.getFields().add2(Cairo.Constants.PRE_ID, csPedidoVtaPrestacion.cSPREPVLISTPEDIDOVTA, Cairo.Constants.Types.id);

          register.getFields().setHaveLastUpdate(false);
          register.getFields().setHaveWhoModify(false);
          if(!Cairo.Database.save(register, , "cIABMClient_Save", C_MODULE, strError)) { return false; }
        }

        if(!load(m_us_id)) { return false; }

        return true;
      };

      var cIABMListDocClient_Terminate = function() {
        return true;
      };

      self.getTitle = function() {
        return m_title;
      };

      self.validate = function() {
        return P.resolvedPromise(true);
      };

      var cIEditGenericListDoc_GridAdd = function(keyProperty) {

      };

      var cIEditGenericListDoc_GridEdit = function(keyProperty) {

      };

      var cIEditGenericListDoc_GridRemove = function(keyProperty) {

      };

      self.setDialog = function(dialog) {
        m_dialog = dialog;
        m_properties = dialog.getProperties();
      };

      var cIEditGenericListDoc_PropertyChange = function(key) {

      };

      var cIEditGenericListDoc_ShowParams = function(us_id) {
        var _rtn = null;
        try {

          if(us_id == NO_ID) { return _rtn; }

          m_us_id = us_id;

          if(!load(us_id)) { return _rtn; }

          if(!loadCollection()) { return _rtn; }

          _rtn = true;
          return _rtn;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "cIEditGenericListDoc_ShowParams", C_MODULE, "");
        }

        return _rtn;
      };

      var cIEditGenericListDoc_TabClick = function(index) {

      };

      var pGetDocFilter = function() {
        return "'{emp_id=0}doct_id = "+ csEDocumentoTipo.cSEDT_PEDIDOVENTA.toString()+ " or doct_id = "+ csEDocumentoTipo.cSEDT_DEVOLUCIONPEDIDOVTA.toString()+ "'";
      };

      var createMenu = function() {
        // **TODO:** on error resume next found !!!

        if(m_menuLoaded) { return; }

        m_menuLoaded = true;

        m_objList.ClearMenu;
        //'Editar Cliente
        m_menuEditCliente = m_objList.AddMenu(Cairo.Language.getText(5038, ""));

        pAddMenuModoPago();

        //'Remitir
        m_menuShowRemito = m_objList.AddMenu(Cairo.Language.getText(1612, ""));
        //'Packing List
        m_menuShowPacking = m_objList.AddMenu(Cairo.Language.getText(1602, ""));
        //'Facturar
        m_menuShowFactura = m_objList.AddMenu(Cairo.Language.getText(1613, ""));
        //'Facturar Automático
        m_menuShowFacturaAuto = m_objList.AddMenu(Cairo.Language.getText(5039, ""));
        m_objList.AddMenu("-");
        //'Firmar
        m_menuFirmar = m_objList.AddMenu(Cairo.Language.getText(1594, ""));
        m_objList.AddMenu("-");
        //'Ver Info del Cliente
        m_menuShowInfoCli = m_objList.AddMenu(Cairo.Language.getText(1614, ""));
        //'Agregar Nota
        m_menuAddNote = m_objList.AddMenu(Cairo.Language.getText(1615, ""));
        //'Ver Notas
        m_menuShowMensajes = m_objList.AddMenu(Cairo.Language.getText(1616, ""));
        m_objList.AddMenu("-");
        //'Ver Aplicaciones
        m_menuShowAplic = m_objList.AddMenu(Cairo.Language.getText(1617, ""));
      };

      // Presenta opciones de menu que generan una
      // factura automatica desde uno o mas pedidos
      // sin preguntar por los medios de pago
      // ya que la cuenta esta definida en
      // el modo de venta
      //
      var pAddMenuModoPago = function() {
        var i = null;
        var sqlstmt = null;
        var rs = null;

        G.redimPreserve(m_vMenuModoPago, 3, 0);

        sqlstmt = "select * from VentaModo where vm_pv <> 0 order by vm_codigo";
        if(!Cairo.Database.openRs(sqlstmt, rs)) { return; }

        if(rs.isEOF()) { return; }

        m_objList.AddMenu("-");
        m_objList.AddMenu("-");

        while (!rs.isEOF()) {

          G.redimPreserve(m_vMenuModoPago, 3, (m_vMenuModoPago, 1).Length + 1);
          i = i + 1;
          m_vMenuModoPago[C_VM_ID, i] == Cairo.Database.valField(rs.getFields(), "vm_id");
          m_vMenuModoPago[C_VM_MENU_ID, i] == m_objList.AddMenu(Cairo.Database.valField(rs.getFields(), "vm_nombre"));
          m_vMenuModoPago[C_VM_IS_CONTADO, i] == Cairo.Database.valField(rs.getFields(), "vm_ctacte") != csE_VentaModoCtaCte.cSVM_CTACTEHOJARUTA;
          m_vMenuModoPago[C_VM_CUE_ID, i] == Cairo.Database.valField(rs.getFields(), "cue_id");

          m_objList.AddMenu("-");
          m_objList.AddMenu("-");

          rs.MoveNext;
        }
      };

      var pProcessModoPago = function(idMenu) {
        var i = null;
        for (i = 1; i <= (m_vMenuModoPago, 2).Length; i++) {
          if(m_vMenuModoPago[C_VM_MENU_ID, i] == idMenu) {

            if(m_vMenuModoPago[C_VM_IS_CONTADO, i]) {
              pShowFactura(true, true, m_vMenuModoPago[C_VM_CUE_ID, i], false);
            }
            else {
              pShowFactura(true, false, NO_ID, true);
            }
          }
        }
      };

      var showNotes = function() {
        var fcId = m_dialog.getId();
        return DB.getData("load[" + m_apiPath + "modulexxxx/xxxx/notes]", fcId)
          .successWithResult(D.showNotes);
      };

      var addNote = function() {
        var xxId = m_dialog.getId();
        return D.addNote(D.Types.TYPEXXXX, xxId, false);
      };

      var pEditCliente = function() {
        var cli_id = null;
        cli_id = pGetCliId();
        if(cli_id == NO_ID) { return; }
        var abmObj = null;
        var o = null;
        abmObj = new CSABMInterface2.cABMGeneric();
        o = CSKernelClient2.CreateObject("CSGeneral2.cCliente");
        o.setObjABM(abmObj);
        o.edit(cli_id, true);
      };

      var pFirmar = function() {

        var pvId = null;
        pvId = m_dialog.getId();

        if(pvId == NO_ID) { return; }

        var firmado = null;
        var docId = null;

        if(!DB.getData(mPedidoConstantes.PEDIDOVENTA, mPedidoConstantes.PV_ID, pvId, mPedidoConstantes.PV_FIRMADO, firmado)) { return; }
        if(!DB.getData(mPedidoConstantes.PEDIDOVENTA, mPedidoConstantes.PV_ID, pvId, mPedidoConstantes.DOC_ID, docId)) { return; }

        if(firmado) {
          if(!Ask(Cairo.Language.getText(1593, ""), vbYes, Cairo.Language.getText(1594, ""))) {
            //If Not Ask("El documento ya ha sido firmado desea borrar la firma", vbYes, "Firmar") Then
            return;
          }
        }

        var doc = null;
        var us_id = null;

        doc = new cDocumento();

        if(!doc.Firmar(docId, us_id)) { return; }

        var sqlstmt = null;
        var rs = null;

        sqlstmt = "sp_DocPedidoVentaFirmar "+ pvId.toString()+ ","+ us_id.toString();
        if(!Cairo.Database.openRs(sqlstmt, rs)) { return; }

        m_objList.sqlstmt = "sp_lsdoc_PedidoVenta";

        m_objList.RefreshLine(pvId);

      };

      var pShowApply = function() {

        var pvId = null;
        pvId = m_dialog.getId();

        if(pvId == NO_ID) { return; }

        var total = null;
        var cotiz = null;
        var nroDoc = null;
        var cliId = null;
        var cliente = null;
        var sucId = null;
        var docId = null;
        var doctId = null;

        var sqlstmt = null;
        var rs = null;

        sqlstmt = "select pv_total, pv_nrodoc, pv.cli_id, cli_nombre,pv.suc_id, pv.doc_id, pv.doct_id from pedidoVenta pv inner join cliente cli on pv.cli_id = cli.cli_id where pv_id = "+ pvId.toString();

        if(!Cairo.Database.openRs(sqlstmt, rs)) { return; }

        if(rs.isEOF()) { return; }

        total = Cairo.Database.valField(rs.getFields(), mPedidoConstantes.PV_TOTAL);
        nroDoc = Cairo.Database.valField(rs.getFields(), mPedidoConstantes.PV_NRODOC);
        cliId = Cairo.Database.valField(rs.getFields(), mPedidoConstantes.CLI_ID);
        cliente = Cairo.Database.valField(rs.getFields(), mPedidoConstantes.CLI_NAME);
        sucId = Cairo.Database.valField(rs.getFields(), mPedidoConstantes.SUC_ID);
        docId = Cairo.Database.valField(rs.getFields(), mPedidoConstantes.DOC_ID);
        doctId = Cairo.Database.valField(rs.getFields(), mPedidoConstantes.DOCT_ID);

        if(!DoCairo.Security.anAccess(csPreVtaModifyAplic, m_docId, csE_DocTypePrestacion.cSEDOCTPREAPLICAR)) { return; }

        if(m_objApply == null) {
          m_objApply = new cPedidoVentaAplic();

          // Edit Apply
          //
        }
        else {
          if(m_objApply.self.getId() != pvId) {
            m_objApply = new cPedidoVentaAplic();
          }
        }

        if(!m_objApply.self.show(pvId, total, nroDoc, cliId, cliente, sucId, docId, doctId == csEDocumentoTipo.cSEDT_DEVOLUCIONPEDIDOVTA)) {
          m_objApply = null;
        }

      };

      var pShowFactura = function(bPushVirtualNext,  bAutoPago,  cue_id,  bModoVentaCtaCte) {
        try {

          var o = null;
          o = CSKernelClient2.CreateObject("CSVenta2.cFacturaVenta");

          o.PushVirtualNext = bPushVirtualNext;
          o.AutoSelectEasy = bPushVirtualNext;
          o.AutoPago = bAutoPago;
          o.ModoVentaCtaCte = bModoVentaCtaCte;
          o.cue_id_autoPago = cue_id;
          o.ShowFacturaPedido(pGetCliId(), pGetPvIds());

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "pShowFactura", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
      };

      var pShowRemito = function() {
        try {

          var o = null;
          o = CSKernelClient2.CreateObject("CSVenta2.cRemitoVenta");

          o.ShowRemito(pGetCliId(), pGetPvIds());

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "pShowRemito", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
      };

      var pShowPacking = function() {
        try {

          var o = null;
          o = CSKernelClient2.CreateObject("CSExport2.cPackingList");

          o.ShowPackingPedido(pGetCliId(), pGetPvIds());

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "pShowPacking", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
      };

      var pGetCliId = function() {
        // **TODO:** on error resume next found !!!

        var pvId = null;
        var cliId = null;

        pvId = m_dialog.getId();
        DB.getData(mPedidoConstantes.PEDIDOVENTA, mPedidoConstantes.PV_ID, pvId, mPedidoConstantes.CLI_ID, cliId);

        return cliId;
      };

      var pGetPvIds = function() {
        return m_objList.SelectedItems;
      };

      self.initialize = function() {
        try {

          //'Pedidos de Venta
          m_title = Cairo.Language.getText(1557, "");

          m_properties = new cABMDocProperties();
          //Set .ImageList = fIcons.IList
          m_properties.setHaveDetail(true);
          m_properties.setStartRowText(4);

          var elem = m_properties.add(null, "TypeTask");
          elem.setName("TypeTask");
          elem.setCaption(" ");
          var elem = elem.add(null);
          elem.FormulaType = csConditionType.cSCONDTNONE;
          elem.IconIndex = C_IMG_TASK;
          elem.setWidth(500);
          elem.setSortType(csSortType.cSSRTTICON);

          var elem = m_properties.add(null, "Observaciones");
          elem.setName("Observaciones");
          elem.setFontName("Tahoma");
          elem.setFontSize(8);
          elem.setForeColor(vbBlue);

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "Class_Terminate", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
      };

      self.destroy = function() {
        try {

          m_dialog = null;
          m_properties = null;

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "Class_Terminate", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
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
              Cairo.Constants.DELETE_FUNCTION, C_MODULE).success(closeDialog, false);
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

        var showListDialog = function() {
          self.documentList.show();
        };

        var closeListDialog = function() {

        }

        createListDialog();
      }
    };
  });

}());