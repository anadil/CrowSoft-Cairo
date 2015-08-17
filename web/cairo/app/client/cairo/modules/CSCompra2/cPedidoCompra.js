(function() {
  "use strict";

  Cairo.module("Xxxx.Edit", function(Edit, Cairo, Backbone, Marionette, $, _) {

  });

  Cairo.module("XxxxListDoc.Edit", function(Edit, Cairo, Backbone, Marionette, $, _) {

    var createObject = function() {

      var self = {};

      var Dialogs = Cairo.Dialogs;

      // cPedidoCompraListDoc
      // 27-01-04

      var C_MODULE = "cPedidoCompraListDoc";

      var C_FECHAINI = "FechaIni";
      var C_FECHAFIN = "FechaFin";

      var C_IMG_TASK = 1;

      // ACA VAN LAS K GENERADAS POR EL ASISTENTE.
      var K_FECHAINI = 1;
      var K_FECHAFIN = 2;
      var K_US_ID = 4;
      var K_EST_ID = 5;
      var K_CCOS_ID = 6;
      var K_SUC_ID = 7;
      var K_DOC_ID = 9;
      // empid
      var K_EMP_ID = 100;
      var m_fechaIni = null;
      var m_fechaFin = null;
      var m_us_id_usuario = "";
      var m_usuario = "";
      var m_est_id = "";
      var m_estado = "";
      var m_ccos_id = "";
      var m_centroCosto = "";
      var m_suc_id = "";
      var m_sucursal = "";
      var m_doc_id = "";
      var m_documento = "";
      var m_condicionPago = "";
      // empid
      var m_emp_id = "";
      var m_empresa = "";
      var m_fechaIniV = "";
      var m_fechaFinV = "";

      var m_dialog;
      var m_objList = null;
      var m_us_id = 0;
      var m_properties;

      var m_title = "";

      var m_menuLoaded;

      var m_menuShowCotizacion = 0;
      var m_menuShowOrdenCompra = 0;

      var m_menuShowMensajes = 0;
      var m_menuAddMensaje = 0;
      var m_menuShowAplic = 0;
      var m_menuFirmar = 0;

      var m_objApply;

      // Properties publicas
      // Properties privadas
      self.processMenu = function(index) {
        try {

          switch (index) {

            case m_menuShowOrdenCompra:
              pShowOrdenCompra();

              break;

            case m_menuShowCotizacion:
              pShowCotizacion();

              break;

            case m_menuShowMensajes:
              pShowMensajes();

              break;

            case m_menuAddMensaje:
              pAddMensaje();

              break;

            case m_menuShowAplic:
              pShowApply();

              break;

            case m_menuFirmar:
              pFirmar();
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

      // funciones privadas
      var loadCollection = function() {
        var c = null;
        var o = null;
        var value = null;
        var bExists = null;

        var properties = m_dialog.getProperties();

        properties.clear();

        c = properties.add(null, C_FECHAINI);
        c.setType(Dialogs.PropertyType.date);
        //'Fecha desde
        c.setName(Cairo.Language.getText(1203, ""));
        c.setKey(K_FECHAINI);
        if(LenB(m_fechaIniV)) {
          c.setValue(m_fechaIniV);
        }
        else {
          c.setValue(m_fechaIni);
        }

        c = properties.add(null, C_FECHAFIN);
        c.setType(Dialogs.PropertyType.date);
        //'Fecha hasta
        c.setName(Cairo.Language.getText(1204, ""));
        c.setKey(K_FECHAFIN);
        if(LenB(m_fechaFinV)) {
          c.setValue(m_fechaFinV);
        }
        else {
          c.setValue(m_fechaFin);
        }

        c = properties.add(null, Cairo.Constants.US_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(csUsuario);
        //'Usuario
        c.setName(Cairo.Language.getText(1137, ""));
        c.setKey(K_US_ID);
        value = m_usuario;
        if(m_us_id_usuario.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(csUsuario, Cairo.Util.val(m_us_id_usuario.Substring(2)), bExists);
          if(!bExists) { m_us_id_usuario = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_us_id_usuario));
        c.setHelpValueProcess(m_us_id_usuario);

        c = properties.add(null, Cairo.Constants.EST_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(csEstado);
        //'Estado
        c.setName(Cairo.Language.getText(1568, ""));
        c.setKey(K_EST_ID);
        value = m_estado;
        if(m_est_id.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(csEstado, Cairo.Util.val(m_est_id.Substring(2)), bExists);
          if(!bExists) { m_est_id = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_est_id));
        c.setHelpValueProcess(m_est_id);

        c = properties.add(null, mComprasConstantes.CCOS_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(Cairo.Tables.CENTROCOSTO);
        //'Centro de Costos
        c.setName(Cairo.Language.getText(1057, ""));
        c.setKey(K_CCOS_ID);
        value = m_centroCosto;
        if(m_ccos_id.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.CENTROCOSTO, Cairo.Util.val(m_ccos_id.Substring(2)), bExists);
          if(!bExists) { m_ccos_id = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_ccos_id));
        c.setHelpValueProcess(m_ccos_id);

        c = properties.add(null, mComprasConstantes.SUC_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(Cairo.Tables.SUCURSAL);
        //'Sucursal
        c.setName(Cairo.Language.getText(1281, ""));
        c.setKey(K_SUC_ID);
        value = m_sucursal;
        if(m_suc_id.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.SUCURSAL, Cairo.Util.val(m_suc_id.Substring(2)), bExists);
          if(!bExists) { m_suc_id = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_suc_id));
        c.setHelpValueProcess(m_suc_id);

        c = properties.add(null, mComprasConstantes.DOC_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(csETablasDocumento.CSDocumento);
        //'Documentos
        c.setName(Cairo.Language.getText(1611, ""));
        c.setKey(K_DOC_ID);
        value = m_documento;
        if(m_doc_id.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(csETablasDocumento.CSDocumento, Cairo.Util.val(m_doc_id.Substring(2)), bExists);
          if(!bExists) { m_doc_id = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_doc_id));
        c.setHelpValueProcess(m_doc_id);
        c.setSelectFilter(pGetDocFilter());

        // empid
        c = properties.add(null, Cairo.Constants.EMP_ID);
        c.setType(Dialogs.PropertyType.select);
        c.setTable(Cairo.Tables.EMPRESA);
        //'Empresa
        c.setName(Cairo.Language.getText(1114, ""));
        c.setKey(K_EMP_ID);
        value = m_empresa;
        if(m_emp_id.Substring(0, 1).toUpperCase() == KEY_NODO) {
          value = GetNombreRama(Cairo.Tables.EMPRESA, Cairo.Util.val(m_emp_id.Substring(2)), bExists);
          if(!bExists) { m_emp_id = "0"; }
        }
        c.setValue(value);
        c.setSelectId(Cairo.Util.val(m_emp_id));
        c.setHelpValueProcess(m_emp_id);

        pCreateMenu();
        if(!m_dialog.show(self, m_objList)) { return false; }

        return true;
      };

      var refreshCollection = function() {

        m_dialog.setTitle(m_name);

        var properties = m_dialog.getProperties();

        return m_dialog.showValues(properties);
      };

      var load = function(us_id) {

        var apiPath = Cairo.Database.getAPIVersion();
        return Cairo.Database.getData("load[" + apiPath + "general/pedidocompralistdoc]", id).then(
          function(response) {

            // empid
            m_emp_id = cUtil.getEmpId();
            m_empresa = cUtil.getEmpNombre();

            if(response.success !== true) { return false; }

            if(response.data.id === Cairo.Constants.NO_ID) {

              m_fechaIni = Date;
              m_fechaFin = Date;
              m_us_id_usuario = Cairo.Constants.NO_ID;
              m_usuario = "";
              m_est_id = Cairo.Constants.NO_ID;
              m_estado = "";
              m_ccos_id = Cairo.Constants.NO_ID;
              m_centroCosto = "";
              m_suc_id = Cairo.Constants.NO_ID;
              m_sucursal = "";
              m_doc_id = Cairo.Constants.NO_ID;
              m_documento = "";
              m_condicionPago = "";

            }
            else {

              rs.MoveLast;
              rs.MoveFirst;

              var i = null;
              while (!rs.isEOF()) {

                switch (Cairo.Database.valField(response.data, Cairo.Constants.LDP_ID)) {

                  case K_FECHAINI:
                    m_fechaIniV = Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR);
                    m_fechaIni = IsDate(Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR)) ? Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR) : Date);

                    break;

                  case K_FECHAFIN:
                    m_fechaFinV = Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR);
                    m_fechaFin = IsDate(Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR)) ? Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR) : Date);

                    break;

                  case K_US_ID:
                    m_us_id_usuario = Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR);

                    break;

                  case K_EST_ID:
                    m_est_id = Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR);

                    break;

                  case K_CCOS_ID:
                    m_ccos_id = Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR);

                    break;

                  case K_SUC_ID:
                    m_suc_id = Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR);

                    break;

                  case K_DOC_ID:
                    m_doc_id = Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR);

                    // empid
                    break;

                  case K_EMP_ID:
                    m_emp_id = Cairo.Database.valField(response.data, Cairo.Constants.LDP_VALOR);

                    break;
                }

                rs.MoveNext;
              }

              var data = null;
              var strLoad = null;

              strLoad = Cairo.Language.getText(2166, "");
              //Error al cargar lor párametros de navegación de Pedidos de Compra

              m_fechaIni = (m_fechaIni != Cairo.Constants.cSNODATE) ? m_fechaIni : Date);
              m_fechaFin = (m_fechaFin != Cairo.Constants.cSNODATE) ? m_fechaFin : Date);

              if(m_us_id_usuario.Substring(0, 1).toUpperCase() != KEY_NODO) {
                if(!Cairo.Database.getData(Cairo.Constants.USUARIO, Cairo.Constants.US_ID, Cairo.Util.val(m_us_id_usuario), Cairo.Constants.US_NAME, data, C_LoadFunction, C_MODULE, strLoad)) { return false; }
                m_usuario = data;
              }
              if(m_est_id.Substring(0, 1).toUpperCase() != KEY_NODO) {
                if(!Cairo.Database.getData(Cairo.Constants.ESTADO, Cairo.Constants.EST_ID, Cairo.Util.val(m_est_id), Cairo.Constants.EST_NAME, data, C_LoadFunction, C_MODULE, strLoad)) { return false; }
                m_estado = data;
              }
              if(m_ccos_id.Substring(0, 1).toUpperCase() != KEY_NODO) {
                if(!Cairo.Database.getData(mComprasConstantes.CENTROCOSTO, mComprasConstantes.CCOS_ID, Cairo.Util.val(m_ccos_id), mComprasConstantes.CCOS_NAME, data, C_LoadFunction, C_MODULE, strLoad)) { return false; }
                m_centroCosto = data;
              }
              if(m_suc_id.Substring(0, 1).toUpperCase() != KEY_NODO) {
                if(!Cairo.Database.getData(mComprasConstantes.SUCURSAL, mComprasConstantes.SUC_ID, Cairo.Util.val(m_suc_id), mComprasConstantes.SUC_NAME, data, C_LoadFunction, C_MODULE, strLoad)) { return false; }
                m_sucursal = data;
              }
              if(m_doc_id.Substring(0, 1).toUpperCase() != KEY_NODO) {
                if(!Cairo.Database.getData(mComprasConstantes.DOCUMENTO, mComprasConstantes.DOC_ID, Cairo.Util.val(m_doc_id), mComprasConstantes.DOC_NAME, data, C_LoadFunction, C_MODULE, strLoad)) { return false; }
                m_documento = data;
              }
              // empid
              if(m_emp_id.Substring(0, 1).toUpperCase() != KEY_NODO) {
                if(!Cairo.Database.getData(Cairo.Constants.EMPRESA, Cairo.Constants.EMP_ID, Cairo.Util.val(m_emp_id), Cairo.Constants.EMP_NAME, data, C_LoadFunction, C_MODULE, strLoad)) { return false; }
                m_empresa = data;
              }

            }

            return true;
          });
      };

      var getCIABMListDocClient_Aplication = function() {
        return Cairo.appName;
      };

      var cIABMListDocClient_DiscardChanges = function() {
        loadCollection();
      };

      var cIABMListDocClient_ListAdHock = function(list) {

      };

      var cIABMListDocClient_Load = function() {

      };

      var getCIABMListDocClient_Properties = function() {
        return m_properties;
      };

      // OJO: NUEVAMENTE LA EXISTENCIA DE FECHAS VIRTUALES HACE QUE EL CODIGO GENERADO POR EL ASISTENTE ESTE MAL
      //      CORRIJALO UTILIZANDO ESTE CODIGO COMO EJEMPLO.
      var cIABMListDocClient_PropertyChange = function(key) {
        var iProp = null;

        var properties = m_dialog.getProperties();

        switch (key) {

          case K_FECHAINI:

            iProp = properties.item(C_FECHAINI);

            if(iProp.getSelectIntValue() != "") {
              m_fechaIniV = iProp.getSelectIntValue();
              m_fechaIni = VDGetDateByName(m_fechaIniV);
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

            iProp = properties.item(C_FECHAFIN);

            if(iProp.getSelectIntValue() != "") {
              m_fechaFinV = iProp.getSelectIntValue();
              m_fechaFin = VDGetDateByName(m_fechaFinV);
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
            var property = properties.item(Cairo.Constants.EST_ID);
            m_estado = property.getValue();
            m_est_id = property.getSelectIntValue();

            break;

          case K_US_ID:
            var property = properties.item(Cairo.Constants.US_ID);
            m_usuario = property.getValue();
            m_us_id_usuario = property.getSelectIntValue();

            break;

          case K_CCOS_ID:
            var property = properties.item(mComprasConstantes.CCOS_ID);
            m_centroCosto = property.getValue();
            m_ccos_id = property.getSelectIntValue();

            break;

          case K_SUC_ID:
            var property = properties.item(mComprasConstantes.SUC_ID);
            m_sucursal = property.getValue();
            m_suc_id = property.getSelectIntValue();

            break;

          case K_DOC_ID:
            var property = properties.item(mComprasConstantes.DOC_ID);
            m_documento = property.getValue();
            m_doc_id = property.getSelectIntValue();

            // empid
            break;

          case K_EMP_ID:
            var property = properties.item(Cairo.Constants.EMP_ID);
            m_empresa = property.getValue();
            m_emp_id = property.getSelectIntValue();
            break;
        }

        return true;
      };

      var cIABMListDocClient_Refresh = function() {
        var sqlstmt = null;

        sqlstmt = "sp_lsdoc_PedidosCompra ";

        sqlstmt = sqlstmt+ Cairo.Database.getUserId().toString()+ ",";

        if(!cDate.getDateNames(m_fechaIniV) == null) {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(VDGetDateByName(m_fechaIniV))+ ",";
        }
        else {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(m_fechaIni)+ ",";
        }

        if(!cDate.getDateNames(m_fechaFinV) == null) {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(VDGetDateByName(m_fechaFinV))+ ",";
        }
        else {
          sqlstmt = sqlstmt+ Cairo.Database.sqlDate(m_fechaFin)+ ",";
        }

        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_us_id_usuario)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_est_id)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_ccos_id)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_suc_id)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_doc_id)+ ",";
        sqlstmt = sqlstmt+ Cairo.Database.sqlString(m_emp_id);

        return sqlstmt;
      };

      var cIABMListDocClient_Save = function() {

        var strError = null;

        strError = Cairo.Language.getText(2166, "");
        //Error al grabar los párametros de navegación de Pedidos de Compra

        var register = null;
        register = new cRegister();

        var sqlstmt = null;

        sqlstmt = "delete ListaDocumentoParametro  where pre_id = "+ csComprasPrestacion.cSPRECPRALISTPEDIDO.toString()+ " and us_id = "+ m_us_id+ " and (emp_id is null or emp_id = "+ cUtil.getEmpId().toString()+ ")";

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
              if(property.getSelectIntValue() != "") {
                register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              }
              else {
                register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getValue(), Cairo.Constants.Types.text);
              }

              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 10, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_FECHAINI, Cairo.Constants.Types.integer);
              break;

            case K_FECHAFIN:

              if(property.getSelectIntValue() != "") {
                register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              }
              else {
                register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getValue(), Cairo.Constants.Types.text);
              }

              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 20, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_FECHAFIN, Cairo.Constants.Types.integer);

              break;

            case K_US_ID:
              register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 40, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_US_ID, Cairo.Constants.Types.integer);
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

            case K_DOC_ID:
              register.getFields().add2(Cairo.Constants.LDP_VALOR, property.getSelectIntValue(), Cairo.Constants.Types.text);
              register.getFields().add2(Cairo.Constants.LDP_ORDEN, 90, Cairo.Constants.Types.integer);
              register.getFields().add2(Cairo.Constants.LDP_ID, K_DOC_ID, Cairo.Constants.Types.integer);
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
          register.getFields().add2(Cairo.Constants.PRE_ID, csComprasPrestacion.cSPRECPRALISTPEDIDO, Cairo.Constants.Types.id);

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

      var getCIABMListDocClient_Title = function() {
        return m_title;
      };

      var cIABMListDocClient_Validate = function() {
        return true;
      };

      var cIEditGenericListDoc_GridAdd = function(keyProperty) {

      };

      var cIEditGenericListDoc_GridEdit = function(keyProperty) {

      };

      var cIEditGenericListDoc_GridRemove = function(keyProperty) {

      };

      var setCIEditGenericListDoc_ObjAbm = function(rhs) {
        m_dialog = rhs;
      };

      var setCIEditGenericListDoc_ObjList = function(rhs) {
        m_objList = rhs;
      };

      var cIEditGenericListDoc_PropertyChange = function(key) {
      };

      var cIEditGenericListDoc_ShowParams = function(us_id) {
        var _rtn = null;
        try {

          if(us_id == Cairo.Constants.NO_ID) { return _rtn; }

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
        return "'{emp_id=0}doct_id = "+ csEDocumentoTipo.cSEDT_PEDIDOCOMPRA.toString()+ " or doct_id = "+ csEDocumentoTipo.cSEDT_DEVOLUCIONPEDIDOCPRA.toString()+ "'";
      };

      var pCreateMenu = function() {
        // **TODO:** on error resume next found !!!

        if(m_menuLoaded) { return; }

        m_menuLoaded = true;

        m_objList.ObjClientMenu = self;
        m_objList.ClearMenu;
        //m_MenuShowCotizacion = .AddMenu("Crear Cotización")
        //'Crear Orden de Compra
        m_menuShowOrdenCompra = m_objList.AddMenu(Cairo.Language.getText(1942, ""));
        m_objList.AddMenu("-");
        //'Firmar
        m_menuFirmar = m_objList.AddMenu(Cairo.Language.getText(1564, ""));
        m_objList.AddMenu("-");
        //'Agregar Nota
        m_menuAddMensaje = m_objList.AddMenu(Cairo.Language.getText(1615, ""));
        //'Ver Notas
        m_menuShowMensajes = m_objList.AddMenu(Cairo.Language.getText(1616, ""));
        m_objList.AddMenu("-");
        //'Ver Aplicaciones
        m_menuShowAplic = m_objList.AddMenu(Cairo.Language.getText(1617, ""));
      };

      var pShowMensajes = function() {
        var sqlstmt = null;
        var pcId = null;
        var rs = null;

        pcId = m_objList.Id;

        sqlstmt = "sp_ParteDiarioGetTitleForDoc "+ csEDocumentoTipo.cSEDT_PEDIDOCOMPRA.toString()+ ","+ pcId.toString();

        if(!Cairo.Database.openRs(sqlstmt, rs)) { return; }

        if(rs.isEOF()) { return; }

        var infodoc = null;
        var doctId = null;

        doctId = Cairo.Database.valField(rs.getFields(), mComprasConstantes.DOCT_ID);
        infodoc = Cairo.Database.valField(rs.getFields(), "info_doc");

        sqlstmt = "sp_PartesDiarioGetForDoc "+ Cairo.Database.getUserId().toString()+ ","+ cUtil.getEmpId().toString()+ ","+ doctId.toString()+ ","+ pcId.toString();
        ShowNotes(Cairo.Language.getText(1617, "", infodoc), sqlstmt);
        //Notas sobre Pedido (1)
      };

      var pAddMensaje = function() {
        var parte = null;
        parte = CSKernelClient2.CreateObject("CSEnvio2.cParteDiario");

        parte.AddParteToDoc(csEDocumentoTipo.cSEDT_PEDIDOCOMPRA, m_objList.Id, false);
      };

      var pFirmar = function() {

        var pcId = null;
        pcId = m_objList.Id;

        if(pcId == Cairo.Constants.NO_ID) { return; }

        var firmado = null;
        var docId = null;

        if(!Cairo.Database.getData(mComprasConstantes.PEDIDOCOMPRA, mComprasConstantes.PC_ID, pcId, mComprasConstantes.PC_FIRMADO, firmado)) { return; }
        if(!Cairo.Database.getData(mComprasConstantes.PEDIDOCOMPRA, mComprasConstantes.PC_ID, pcId, mComprasConstantes.DOC_ID, docId)) { return; }

        if(firmado) {
          if(!Ask(Cairo.Language.getText(1593, ""), vbYes, Cairo.Language.getText(1594, ""))) {
            //El documento ya ha sido firmado desea borrar la firma, Firmar
            return;
          }
        }

        var doc = null;
        var us_id = null;

        doc = new cDocumento();

        if(!doc.Firmar(docId, us_id)) { return; }

        var sqlstmt = null;
        var rs = null;

        sqlstmt = "sp_DocPedidoCompraFirmar "+ pcId.toString()+ ","+ us_id.toString();
        if(!Cairo.Database.openRs(sqlstmt, rs)) { return; }

        m_objList.sqlstmt = "sp_lsdoc_PedidoCompra";

        m_objList.RefreshLine(pcId);

      };

      var pShowApply = function() {

        var pcId = null;
        pcId = m_objList.Id;

        if(pcId == Cairo.Constants.NO_ID) { return; }

        var total = null;
        var nroDoc = null;
        var usId = null;
        var usuario = null;
        var sucId = null;
        var docId = null;
        var doctId = null;

        var sqlstmt = null;
        var rs = null;

        sqlstmt = "select pc_total, pc_nrodoc, pc.us_id, us_nombre, pc.suc_id, pc.doc_id, pc.doct_id from pedidocompra pc inner join usuario us  on pc.us_id = us.us_id where pc_id = "+ pcId.toString();

        if(!Cairo.Database.openRs(sqlstmt, rs)) { return; }

        if(rs.isEOF()) { return; }

        total = Cairo.Database.valField(rs.getFields(), mComprasConstantes.PC_TOTAL);
        nroDoc = Cairo.Database.valField(rs.getFields(), mComprasConstantes.PC_NRODOC);
        usId = Cairo.Database.valField(rs.getFields(), Cairo.Constants.US_ID);
        usuario = Cairo.Database.valField(rs.getFields(), Cairo.Constants.US_NAME);
        sucId = Cairo.Database.valField(rs.getFields(), mComprasConstantes.SUC_ID);
        docId = Cairo.Database.valField(rs.getFields(), mComprasConstantes.DOC_ID);
        doctId = Cairo.Database.valField(rs.getFields(), mComprasConstantes.DOCT_ID);

        if(!DoCairo.Security.anAccess(csComprasPrestacion.cSPRECPRAMODIFYAPLIC, m_doc_id, csE_DocTypePrestacion.cSEDOCTPREAPLICAR)) { return; }

        if(m_objApply == null) {
          m_objApply = new cPedidoCompraAplic();

          // Edit Apply
          //
        }
        else {
          if(m_objApply.self.getId() != pcId) {
            m_objApply = new cPedidoCompraAplic();
          }
        }

        if(!m_objApply.self.show(pcId, total, nroDoc, usId, usuario, sucId, docId, doctId == csEDocumentoTipo.cSEDT_DEVOLUCIONPEDIDOCPRA)) {
          m_objApply = null;
        }

      };

      var pShowOrdenCompra = function() {
        try {

          var o = null;
          o = new CSCompra2.cOrdenCompra();

          o.ShowOrdenPedido(pGetPcIds());

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "pShowOrdenCompra", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
      };

      var pShowCotizacion = function() {
        try {

          //  Dim o As CSCompra2.cCotizacionCompra
          //  Set o = New CSCompra2.cCotizacionCompra
          //
          //  o.ShowCotizacion pGetPcIds()

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "pShowCotizacion", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
      };

      var pGetPcIds = function() {
        return m_objList.SelectedItems;
      };

      self.initialize = function() {
        try {

          //'Pedidos de Compras
          m_title = Cairo.Language.getText(1937, "");

          m_properties = new cABMDocProperties();
          //Set .ImageList = fResource.iList
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
          m_objList = null;
          m_properties = null;

          // **TODO:** goto found: GoTo ExitProc;
        }
        catch (ex) {
          Cairo.manageErrorEx(ex.message, "Class_Terminate", C_MODULE, "");
          // **TODO:** label found: ExitProc:;
        }
        // **TODO:** on error resume next found !!!
      };

      ////////////////////////////////
      //  Codigo estandar de errores
      //  On Error GoTo ControlError
      //
      //  GoTo ExitProc
      //ControlError:
      //  MngError err,"", C_Module, ""
      //  If Err.Number Then Resume ExitProc
      //ExitProc:
      //  On Error Resume Next

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