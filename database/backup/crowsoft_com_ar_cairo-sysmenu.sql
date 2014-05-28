--
-- PostgreSQL database dump
--

-- Dumped from database version 9.0.10
-- Dumped by pg_dump version 9.1.4
-- Started on 2014-05-28 14:09:18 ART

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

SET search_path = public, pg_catalog;

--
-- TOC entry 3967 (class 0 OID 0)
-- Dependencies: 776
-- Name: sysmenu_me_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sysmenu_me_id_seq', 927, true);


--
-- TOC entry 3964 (class 0 OID 102051)
-- Dependencies: 777
-- Data for Name: sysmenu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO sysmenu VALUES (636, '2048', 'csMenuTesoreria', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocRendicion.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (640, '2978', 'csMenuConfig', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSAfip', 'C:proyectosCSAfipCodigocConstancia.cls', 927, '', '');
INSERT INTO sysmenu VALUES (638, '2048', 'csMenuTesoreria', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocResolucionCupon.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (682, '4667', 'csMenuConfigEdu', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSEducacion', 'C:proyectosCSCairoModulosCSEducacionCSEducacionCodigocAula.cls', 927, '', '');
INSERT INTO sysmenu VALUES (641, '2978', 'csPreAfipGetConstancia', NULL, '2978', 0, 1, 0, 0, 0, 0, 'cConstancia', 'CSAfip', 'C:proyectosCSAfipCodigocConstancia.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (701, '1001', 'csMenuConfig', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSLenguaje', 'C:proyectosCSLenguajeCodigocLenguaje.cls', 927, '', '');
INSERT INTO sysmenu VALUES (656, '1589', 'csMenuVentas', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSPedidoVenta', 'C:proyectosCSCairoModulosCSVentasCSPedidoVentaCodigocPedidoVenta.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (672, '1879', 'csMenuCompras', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSCompras', 'C:proyectosCSCairoModulosCSComprasCSCompraCodigocRemitoCompra.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (475, '2549', 'csPreExpListPermisoEmbarque', 22012, '5134', 0, 1, 0, 0, 0, 0, 'cPermisoEmbarque', 'CSExport', 'C:proyectosCSExportCodigocPermisoEmbarque.cls', 506, 'list', '');
INSERT INTO sysmenu VALUES (637, '5137', 'csPreTsrListRendicion', NULL, '2048', 0, 1, 0, 0, 0, 0, 'cRendicion', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocRendicion.cls', 638, '', '');
INSERT INTO sysmenu VALUES (741, '""', 'csPreGModifyConfigCompras * -1', NULL, '1381', 0, 1, 1, 0, 0, 0, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocCompraConfigEdit.cls', 825, '', '');
INSERT INTO sysmenu VALUES (746, '""', 'csPreGModifyConfigContabilidad * -1', NULL, '1032', 0, 1, 1, 0, 0, 0, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocContabilidadConfigEdit.cls', 834, '', '');
INSERT INTO sysmenu VALUES (764, '1230', 'csPreGListGasto', NULL, '1029', 0, 1, 0, 0, 0, 0, 'cGasto', 'CSGeneral', 'C:proyectosCSGeneralCodigocGasto.cls', 836, '', '');
INSERT INTO sysmenu VALUES (800, '3973', 'csMenuConfigSueldos', NULL, '3972', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocPersonalConfigEdit.cls', 799, '', '');
INSERT INTO sysmenu VALUES (802, '', 'csPreGModifyConfigPersonal * -1', NULL, '3973', 0, 1, 1, 0, 0, 0, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocPersonalConfigEdit.cls', 800, '', '');
INSERT INTO sysmenu VALUES (838, '', 'csPreGModifyConfigTesoreria * -1', NULL, '1029', 0, 1, 1, 0, 0, 0, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocTesoreriaConfigEdit.cls', 836, '', '');
INSERT INTO sysmenu VALUES (841, '""', 'csPreGModifyConfigTicket * -1', NULL, '1851', 0, 1, 1, 0, 0, 0, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocTicketConfigEdit.cls', 925, '', '');
INSERT INTO sysmenu VALUES (856, '', 'csPreGModifyConfigVentas * -1', NULL, '1033', 0, 1, 1, 0, 0, 0, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocVentaConfigEdit.cls', 859, '', '');
INSERT INTO sysmenu VALUES (768, '1234', 'csPreGListIdioma', 1216, '1030', 0, 1, 0, 0, 0, 0, 'cIdioma', 'CSGeneral', 'C:proyectosCSGeneralCodigocIdioma.cls', 850, 'list', '');
INSERT INTO sysmenu VALUES (872, '5136', 'csPreR1361ListCais', NULL, '3362', 0, 1, 0, 0, 0, 0, 'cCAIS', 'CSInfoAFIP', 'C:proyectosCSInfoAFIPInformesResolucion 1361CodigocCAIS.cls', 869, '', '');
INSERT INTO sysmenu VALUES (876, '2757', '-csPreOAltaPermiso', NULL, '2756', 0, 1, 0, 0, 0, 0, '', 'CSOAPI', 'C:proyectosCSOAPICodigocMenuPermisoRol.cls', 881, '', '');
INSERT INTO sysmenu VALUES (879, '2757', 'csPreOAltaPermiso', NULL, '2758', 0, 1, 0, 0, 0, 0, '', 'CSOAPI', 'C:proyectosCSOAPICodigocMenuPermisoUsuario.cls', 888, '', '');
INSERT INTO sysmenu VALUES (881, '2756', 'csMenuCfgRol', NULL, '1134', 0, 1, 0, 0, 0, 1, '', 'CSOAPI', 'C:proyectosCSOAPICodigocRol.cls', 887, '', '');
INSERT INTO sysmenu VALUES (885, '2779', 'csPreOListSysModuloTCP', NULL, '2703', 0, 1, 0, 0, 0, 0, 'cSysModuloTCP', 'CSOAPI', 'C:proyectosCSOAPICodigocSysModuloTCP.cls', 883, '', '');
INSERT INTO sysmenu VALUES (888, '2758', 'csMenuCfgUsuario', NULL, '1134', 0, 1, 0, 0, 0, 1, '', 'CSOAPI', 'C:proyectosCSOAPICodigocUsuario.cls', 887, '', '');
INSERT INTO sysmenu VALUES (897, '3702', 'csPreSGRListFacturaAvalCredito', NULL, '3700', 0, 1, 0, 0, 0, 0, 'cFacturaVentaSGR', 'CSSGR', 'C:proyectosCSSGRCodigocFacturaVentaSGR.cls', 896, '', '');
INSERT INTO sysmenu VALUES (898, '3703', 'csPreSGRListFacturaAvalCheque', NULL, '3700', 0, 1, 0, 0, 0, 0, 'cFacturaVentaSGR', 'CSSGR', 'C:proyectosCSSGRCodigocFacturaVentaSGR.cls', 896, '', '');
INSERT INTO sysmenu VALUES (899, '3708', 'csPreSGRListFacturaAvalOrdenCompra', NULL, '3700', 0, 1, 0, 0, 0, 0, 'cFacturaVentaSGR', 'CSSGR', 'C:proyectosCSSGRCodigocFacturaVentaSGR.cls', 896, '', '');
INSERT INTO sysmenu VALUES (901, '3714', 'csPreSGRListFacturaAccionParticipe', NULL, '3701', 0, 1, 0, 0, 0, 0, 'cFacturaVentaSGR', 'CSSGR', 'C:proyectosCSSGRCodigocFacturaVentaSGR.cls', 900, '', '');
INSERT INTO sysmenu VALUES (902, '3712', 'csPreSGRListFacturaAccionProtector', NULL, '3701', 0, 1, 0, 0, 0, 0, 'cFacturaVentaSGR', 'CSSGR', 'C:proyectosCSSGRCodigocFacturaVentaSGR.cls', 900, '', '');
INSERT INTO sysmenu VALUES (904, '3694', 'csPreSGRListSocio', NULL, '3690', 0, 1, 0, 0, 0, 0, 'cSocio', 'CSSGR', 'C:proyectosCSSGRCodigocSocio.cls', 905, '', '');
INSERT INTO sysmenu VALUES (906, '3691', 'csPreSGRListSocioForm', NULL, '3690', 0, 1, 0, 0, 0, 0, 'cSocioForm', 'CSSGR', 'C:proyectosCSSGRCodigocSocioForm.cls', 905, '', '');
INSERT INTO sysmenu VALUES (499, '2447', 'csPreExpListGarantia', 22012, '5134', 0, 1, 0, 0, 0, 0, 'cGarantia', 'CSExport', 'C:proyectosCSExportCodigocGarantia.cls', 506, 'list', '');
INSERT INTO sysmenu VALUES (534, '1641', 'csPreVtaListFactura', 16005, '1589', 0, 1, 0, 0, 0, 0, 'cFacturaVenta', 'CSVenta', 'C:proyectosCSCairoModulosCSVentasCSVentaCodigocFacturaVenta.cls', 656, 'list', 'venta/facturaventa');
INSERT INTO sysmenu VALUES (580, '4666', 'csPreEListMateria', 37004, '4667', 0, 1, 0, 0, 0, 0, 'cMateria', 'CSEducacion', 'C:proyectosCSCairoModulosCSEducacionCSEducacionCodigocMateria.cls', 682, 'list', '');
INSERT INTO sysmenu VALUES (685, '1111', 'csPreGListCuenta', 1047, '1032', 0, 1, 0, 0, 0, 0, 'cCuenta', 'CSGeneral', 'C:proyectosCSGeneralCodigocCuenta.cls', 834, 'list', 'general/cuenta');
INSERT INTO sysmenu VALUES (778, '3166', 'csPreGVentaImportRemito', 1995, '1033', 0, 1, 0, 0, 0, 0, 'cImportRemito', 'CSGeneral', 'C:proyectosCSGeneralCodigocImportRemitoVenta.cls', 859, 'import', 'ventaconfig/importremito');
INSERT INTO sysmenu VALUES (702, '1001', 'csPreLengListLenguaje', 14004, '1001', 0, 1, 0, 0, 0, 0, 'cLenguaje', 'CSLenguaje', 'C:proyectosCSLenguajeCodigocLenguaje.cls', NULL, 'list', 'lenguaje/lenguaje');
INSERT INTO sysmenu VALUES (501, '2496', 'csPreExpListImportacionTmp', 22034, '5134', 0, 1, 0, 0, 0, 0, 'cImportacionTemporal', 'CSExport', 'C:proyectosCSExportCodigocImportacionTemporal.cls', 506, 'import', 'export/importaciontemporal');
INSERT INTO sysmenu VALUES (464, '4529', 'csPrePListEmpleadoART', 35020, '3973', 0, 1, 0, 1, 0, 0, 'cEmpleadoART', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocEmpleadoART.cls', 800, 'list', 'personal/empleadoart');
INSERT INTO sysmenu VALUES (470, '3237', 'csPreEmpqListContraMarca', 1000060, '3236', 0, 1, 0, 0, 0, 0, 'cContraMarca', 'CSEmpaque', 'C:proyectosCSEmpaqueCodigocContraMarca.cls', 575, 'list', 'empaque/contramarca');
INSERT INTO sysmenu VALUES (473, '3247', 'csPreEmpqListPuerto', 1000056, '3236', 0, 1, 0, 0, 0, 0, 'cPuerto', 'CSEmpaque', 'C:proyectosCSEmpaqueCodigocPuerto.cls', 575, 'list', 'empaque/puerto');
INSERT INTO sysmenu VALUES (476, '3265', 'csPreExpListExpoFamilia', 22504, '2418', 0, 1, 0, 0, 0, 0, 'cExpoFamilia', 'CSExportPrint', 'C:proyectosCSExportPrintCodigocExpoFamilia.cls', 495, 'list', 'exportprint/expofamilia');
INSERT INTO sysmenu VALUES (562, '2570', 'csPreDListDocumento', 4003, '2569', 0, 1, 0, 0, 0, 0, 'cDocumento', 'CSDocumento', 'C:proyectosCSDocumentoCodigocDocumentoEdit.cls', 569, 'list', 'documentoedit/documento');
INSERT INTO sysmenu VALUES (564, '3782', 'csPredListDocumentoGrupo', 4017, '2569', 0, 1, 0, 0, 0, 0, 'cDocumentoGrupo', 'CSDocumento', 'C:proyectosCSDocumentoCodigocDocumentoGrupo.cls', 569, 'list', 'documentoedit/documentogrupo');
INSERT INTO sysmenu VALUES (568, '2622', 'csPreDListFechaControlAcceso', 4007, '2569', 0, 1, 0, 0, 0, 0, 'cFechaControlAcceso', 'CSDocumento', 'C:proyectosCSDocumentoCodigocFechaControlAcceso.cls', 569, 'list', 'documentoedit/fechacontrolacceso');
INSERT INTO sysmenu VALUES (570, '2625', 'csPreDListTalonario', 4011, '2569', 0, 1, 0, 0, 0, 0, 'cTalonario', 'CSDocumento', 'C:proyectosCSDocumentoCodigocTalonarioEdit.cls', 569, 'list', 'documentoedit/talonario');
INSERT INTO sysmenu VALUES (797, '1272', 'csPreGListPersona', 1208, '1134', 0, 1, 0, 0, 0, 0, 'cPersona', 'CSGeneral', 'C:proyectosCSGeneralCodigocPersona.cls', 887, 'list', 'general/persona');
INSERT INTO sysmenu VALUES (798, '4673', 'csPreGListPersonaDocumentoTipo', 1275, '1134', 0, 1, 0, 1, 0, 0, 'cPersonaDocumentoTipo', 'CSGeneral', 'C:proyectosCSGeneralCodigocPersonaDocumentoTipo.cls', 887, 'list', 'general/personadocumentotipo');
INSERT INTO sysmenu VALUES (572, '3250', 'csPreEmpqListBarco', 1000052, '3236', 0, 1, 0, 0, 0, 0, 'cBarco', 'CSEmpaque', 'C:proyectosCSEmpaqueCodigocBarco.cls', 575, 'list', 'empaque/barco');
INSERT INTO sysmenu VALUES (671, '1939', 'csPreCpraListPedido', 17017, '1879', 0, 1, 0, 0, 0, 0, 'cPedidoCompra', 'CSCompras', 'C:proyectosCSCairoModulosCSComprasCSCompraCodigocPedidoCompra.cls', 672, 'list', 'compra/pedidocompra');
INSERT INTO sysmenu VALUES (673, '1947', 'csPreCpraListRemito', 17009, '1879', 0, 1, 0, 0, 0, 0, 'cRemitoCompra', 'CSCompras', 'C:proyectosCSCairoModulosCSComprasCSCompraCodigocRemitoCompra.cls', 672, 'list', 'compra/remitocompra');
INSERT INTO sysmenu VALUES (675, '1964', 'csPreConListAsiento', 19004, '1742', 0, 1, 0, 0, 0, 0, 'cAsiento', 'CSContabilidad', 'C:proyectosCSCairoModulosCSContabilidadCSContabilidadCodigocAsiento.cls', 678, 'list', 'contabilidad/asiento');
INSERT INTO sysmenu VALUES (694, '1460', 'csPreGListSucursal', 1027, '1134', 0, 1, 0, 1, 0, 0, 'cSucursal', 'CSGeneral', 'C:proyectosCSGeneralCodigocSucursal.cls', 887, 'list', 'general/sucursal');
INSERT INTO sysmenu VALUES (679, '1743', 'csPreConListEjercicio', 19008, '1742', 0, 1, 0, 0, 0, 0, 'cEjercicioContable', 'CSContabilidad', 'C:proyectosCSCairoModulosCSContabilidadCSContabilidadCodigocEjercicioContable.cls', 678, 'list', 'contabilidad/ejerciciocontable');
INSERT INTO sysmenu VALUES (681, '4681', 'csPreEListAlumno', 37016, '4690', 0, 1, 0, 0, 0, 0, 'cAlumno', 'CSEducacion', 'C:proyectosCSCairoModulosCSEducacionCSEducacionCodigocAlumno.cls', 680, 'list', 'edu/alumno');
INSERT INTO sysmenu VALUES (683, '4670', 'csPreEListAula', 37008, '4667', 0, 1, 0, 0, 0, 0, 'cAula', 'CSEducacion', 'C:proyectosCSCairoModulosCSEducacionCSEducacionCodigocAula.cls', 682, 'list', 'edu/aula');
INSERT INTO sysmenu VALUES (762, '5061', 'csPreGListFormaPago', 1287, '1029', 0, 1, 0, 0, 0, 0, 'cFormaPago', 'CSGeneral', 'C:proyectosCSGeneralCodigocFormaPago.cls', 836, 'list', 'general/formapago');
INSERT INTO sysmenu VALUES (780, '1238', 'csPreGListLeyenda', 1051, '1032', 0, 1, 0, 0, 0, 0, 'cLeyenda', 'CSGeneral', 'C:proyectosCSGeneralCodigocLeyenda.cls', 834, 'list', 'general/leyenda');
INSERT INTO sysmenu VALUES (730, '1078', 'csPreGListCiudad', 1111, '1030', 0, 1, 0, 0, 0, 0, 'cCiudad', 'CSGeneral', 'C:proyectosCSGeneralCodigocCiudad.cls', 850, 'list', 'general/ciudad');
INSERT INTO sysmenu VALUES (756, '1208', 'csPreGListEscala', 1087, '1031', 0, 1, 0, 0, 0, 0, 'cEscala', 'CSGeneral', 'C:proyectosCSGeneralCodigocEscala.cls', 848, 'list', 'general/escala');
INSERT INTO sysmenu VALUES (760, '1209', 'csPreGListFeriado', 1238, '1029', 0, 1, 0, 0, 0, 0, 'cFeriado', 'CSGeneral', 'C:proyectosCSGeneralCodigocFeriado.cls', 836, 'list', 'general/feriado');
INSERT INTO sysmenu VALUES (782, '3071', 'csPreGListListaDescuento', 1155, '1031', 0, 1, 0, 0, 0, 0, 'cListaDescuento', 'CSGeneral', 'C:proyectosCSGeneralCodigocListaDescuentoEdit.cls', 848, 'list', 'articulo/listadescuento');
INSERT INTO sysmenu VALUES (784, '4900', 'csPreGListaPrecioCalc', 1983, '1031', 0, 1, 0, 0, 0, 0, 'cListaPrecioCalc', 'CSGeneral', 'C:proyectosCSGeneralCodigocListaPrecioCalc.cls', 848, 'list', 'general/listapreciocalc');
INSERT INTO sysmenu VALUES (786, '4617', 'csPreGListaPrecioConfig', 1984, '1031', 0, 1, 0, 0, 0, 0, 'cListaPrecioConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocListaPrecioConfig.cls', 848, 'list', 'general/listaprecioconfig');
INSERT INTO sysmenu VALUES (788, '3078', 'csPreGListListaPrecio', 1099, '1031', 0, 1, 0, 0, 0, 0, 'cListaPrecio', 'CSGeneral', 'C:proyectosCSGeneralCodigocListaPrecioEdit.cls', 848, 'list', 'articulo/listaprecio');
INSERT INTO sysmenu VALUES (790, '3120', 'csPreGListMoneda', 1031, '1029', 0, 1, 0, 0, 0, 0, 'cMoneda', 'CSGeneral', 'C:proyectosCSGeneralCodigocMonedaEdit.cls', 836, 'list', 'tesoreriaconfig/moneda');
INSERT INTO sysmenu VALUES (792, '1246', 'csPreGListPais', 1107, '1030', 0, 1, 0, 1, 0, 0, 'cPais', 'CSGeneral', 'C:proyectosCSGeneralCodigocPais.cls', 850, 'list', 'general/pais');
INSERT INTO sysmenu VALUES (794, '1251', 'csPreGListPercepcion', 1180, '1032', 0, 1, 0, 0, 0, 0, 'cPercepcion', 'CSGeneral', 'C:proyectosCSGeneralCodigocPercepcion.cls', 834, 'list', 'general/percepcion');
INSERT INTO sysmenu VALUES (796, '1264', 'csPreGListPercepcionTipo', 1184, '1032', 0, 1, 0, 1, 0, 0, 'cPercepcionTipo', 'CSGeneral', 'C:proyectosCSGeneralCodigocPercepcionTipo.cls', 834, 'list', 'general/percepciontipo');
INSERT INTO sysmenu VALUES (766, '1030', 'csPreGModifyConfig', 1156, '1030', 0, 1, 0, 0, 0, 0, 'cGeneralConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocGeneralConfig.cls', 850, 'edit', 'generalex/generalconfig');
INSERT INTO sysmenu VALUES (469, '2313', 'csPreEnvModifyConfig', 15009, '2383', 0, 1, 0, 0, 0, 0, 'cEnvioConfig', 'CSEnvio', 'C:proyectosCSEnvioCodigocEnvioConfig.cls', 484, 'edit', 'envio/envioconfig');
INSERT INTO sysmenu VALUES (496, '2431', 'csPreGModifyConfigExport', 22037, '2418', 0, 1, 0, 0, 0, 0, 'cExportConfig', 'CSExport', 'C:proyectosCSExportCodigocExportConfig.cls', 495, 'edit', 'export/exportconfig');
INSERT INTO sysmenu VALUES (864, '3288', 'csPreImpleListImportacion', 21004, '3287', 0, 1, 0, 0, 0, 0, 'cImportacion', 'CSImplementacion', 'C:proyectosCSImplementacionCodigocImportacion.cls', 863, 'import', 'implementacion/importacion');
INSERT INTO sysmenu VALUES (868, '3339', 'csPreImporListImportacionProceso', 23004, '3335', 0, 1, 0, 0, 0, 0, 'cImportacionProceso', 'CSImport', 'C:proyectosCSImportCodigocImportacionProceso.cls', 867, 'import', 'import/importacionproceso');
INSERT INTO sysmenu VALUES (858, '5076', 'csPreGListVentaModo', 1291, '1033', 0, 1, 0, 0, 0, 0, 'cVentaModo', 'CSGeneral', 'C:proyectosCSGeneralCodigocVentaModo.cls', 859, 'list', 'general/ventamodo');
INSERT INTO sysmenu VALUES (860, '1506', 'csPreGListZona', 1119, '1033', 0, 1, 0, 0, 0, 0, 'cZona', 'CSGeneral', 'C:proyectosCSGeneralCodigocZona.cls', 859, 'list', 'general/zona');
INSERT INTO sysmenu VALUES (870, '3363', 'csInfoAFIPListAFIPEsquema', 6004, '3362', 0, 1, 0, 0, 0, 0, 'cAFIPEsquema', 'CSInfoAFIP', 'C:proyectosCSInfoAFIPCodigocAFIPEsquema.cls', 869, 'list', 'infoafip/afipesquema');
INSERT INTO sysmenu VALUES (882, '2764', 'csPreOListaRol', 14, '2756', 0, 1, 0, 0, 0, 0, 'cRol', 'CSOAPI', 'C:proyectosCSOAPICodigocRol.cls', 881, 'list', 'oapiedit/rol');
INSERT INTO sysmenu VALUES (884, '2772', 'csPreOListSysmodulo + 500', 21, '2703', 0, 1, 0, 0, 0, 0, 'cSysmodulo', 'CSOAPI', 'C:proyectosCSOAPICodigocSysmodulo.cls', 883, 'list', 'oapiedit/sysmodulo');
INSERT INTO sysmenu VALUES (886, '2785', 'csPreOListTabla + 500', 25, '2703', 0, 1, 0, 0, 0, 0, 'cTabla', 'CSOAPI', 'C:proyectosCSOAPICodigocTabla.cls', 883, 'list', 'oapiedit/tabla');
INSERT INTO sysmenu VALUES (889, '2764', 'csPreOListUser', 10, '2758', 0, 1, 0, 0, 0, 0, 'cUsuario', 'CSOAPI', 'C:proyectosCSOAPICodigocUsuario.cls', 888, 'list', 'oapiedit/usuario');
INSERT INTO sysmenu VALUES (893, '3042', 'csPreProdListMaquina', 13005, '3041', 0, 1, 0, 0, 0, 0, 'cMaquina', 'CSProduccion', 'C:proyectosCSProduccionCodigocMaquina.cls', 894, 'list', 'produccion/maquina');
INSERT INTO sysmenu VALUES (895, '5135', 'csPreProdListProductoBOM', 13009, '3041', 0, 1, 0, 0, 0, 0, 'cProductoBOM', 'CSProduccion', 'C:proyectosCSProduccionCodigocProductoBOM.cls', 894, 'list', 'produccion/productobom');
INSERT INTO sysmenu VALUES (908, '2634', 'csPreTareaListAgenda', 2027, '1851', 0, 1, 0, 0, 0, 0, 'cAgenda', 'CSTask', 'C:proyectosCSTaskCodigocAgenda.cls', 925, 'list', 'tarea/agenda');
INSERT INTO sysmenu VALUES (910, '2640', 'csPreTareaListContacto', 2015, '1851', 0, 1, 0, 0, 0, 0, 'cContacto', 'CSTask', 'C:proyectosCSTaskCodigocContacto.cls', 925, 'list', 'tarea/contacto');
INSERT INTO sysmenu VALUES (914, '2650', 'csPreTareaListHora', 2023, '1755', 0, 1, 0, 0, 0, 0, 'cHora', 'CSTask', 'C:proyectosCSTaskCodigocHora.cls', 923, 'list', 'tarea/hora');
INSERT INTO sysmenu VALUES (758, '3144', 'csPreGVentaFacturaAnular', 1996, '1033', 0, 1, 0, 0, 0, 0, 'cFacturaVentaAnular', 'CSGeneral', 'C:proyectosCSGeneralCodigocFacturaVentaAnular.cls', 859, 'edit', 'ventaconfig/facturaventaanular');
INSERT INTO sysmenu VALUES (732, '1082', 'csPreGListClearing', 1067, '1029', 0, 1, 0, 0, 0, 0, 'cClearing', 'CSGeneral', 'C:proyectosCSGeneralCodigocClearing.cls', 836, 'list', 'general/clearing');
INSERT INTO sysmenu VALUES (734, '1536', 'csPreGListCliente', 1071, '1033', 0, 1, 0, 0, 0, 0, 'cCliente', 'CSGeneral', 'C:proyectosCSGeneralCodigocCliente.cls', 859, 'list', 'general/cliente');
INSERT INTO sysmenu VALUES (736, '4658', 'csPreGListClienteContactoTipo', 1271, '1033', 0, 1, 0, 0, 0, 0, 'cClienteContactoTipo', 'CSGeneral', 'C:proyectosCSGeneralCodigocClienteContactoTipo.cls', 859, 'list', 'general/clientecontactotipo');
INSERT INTO sysmenu VALUES (738, '1089', 'csPreGListCobrador', 1059, '1033', 0, 1, 0, 0, 0, 0, 'cCobrador', 'CSGeneral', 'C:proyectosCSGeneralCodigocCobrador.cls', 859, 'list', 'general/cobrador');
INSERT INTO sysmenu VALUES (743, '1096', 'csPreGListCondicionPago', 1151, '1029', 0, 1, 0, 0, 0, 0, 'cCondicionPago', 'CSGeneral', 'C:proyectosCSGeneralCodigocCondicionPago.cls', 836, 'list', 'general/condicionpago');
INSERT INTO sysmenu VALUES (747, '1133', 'csPreGListDepartamento', 1196, '1134', 0, 1, 0, 0, 0, 0, 'cDepartamento', 'CSGeneral', 'C:proyectosCSGeneralCodigocDepartamento.cls', 887, 'list', 'general/departamento');
INSERT INTO sysmenu VALUES (749, '1141', 'csPreGListDepositoFisico', 1127, '1052', 0, 1, 0, 0, 0, 0, 'cDepositoFisico', 'CSGeneral', 'C:proyectosCSGeneralCodigocDepositoFisico.cls', 846, 'list', 'general/depositofisico');
INSERT INTO sysmenu VALUES (751, '1147', 'csPreGListDepositoLogico', 1019, '1052', 0, 1, 0, 0, 0, 0, 'cDepositoLogico', 'CSGeneral', 'C:proyectosCSGeneralCodigocDepositoLogico.cls', 846, 'list', 'general/depositologico');
INSERT INTO sysmenu VALUES (753, '1162', 'csPreGListEmbalaje', 1225, '1031', 0, 1, 0, 0, 0, 0, 'cEmbalaje', 'CSGeneral', 'C:proyectosCSGeneralCodigocEmbalaje.cls', 848, 'list', 'general/embalaje');
INSERT INTO sysmenu VALUES (754, '1175', 'csPreGListEmpresa', 1204, '1134', 0, 1, 0, 0, 0, 0, 'cEmpresa', 'CSGeneral', 'C:proyectosCSGeneralCodigocEmpresa.cls', 887, 'list', 'general/empresa');
INSERT INTO sysmenu VALUES (826, '3200', 'csPreGCompraSaldoInicial', 1997, '1381', 0, 1, 0, 0, 0, 0, 'cSaldoInicial', 'CSGeneral', 'C:proyectosCSGeneralCodigocSaldoInicialCompra.cls', 825, 'import', 'compraconfig/saldoinicial');
INSERT INTO sysmenu VALUES (828, '3200', 'csPreGVentaSaldoInicial', 1998, '1033', 0, 1, 0, 0, 0, 0, 'cSaldoInicial', 'CSGeneral', 'C:proyectosCSGeneralCodigocSaldoInicialVenta.cls', 859, 'import', 'ventaconfig/saldoinicial');
INSERT INTO sysmenu VALUES (830, '2431', 'csPreGModifyConfigStock', 1999, '1052', 0, 1, 0, 0, 0, 0, 'cStockConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocStockConfigEdit.cls', 846, 'edit', 'stockconfig/stockconfig');
INSERT INTO sysmenu VALUES (837, '2431', 'csPreGModifyConfigTesoreria', 1174, '1029', 0, 1, 0, 0, 0, 0, 'cTesoreriaConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocTesoreriaConfigEdit.cls', 836, 'edit', 'tesoreriaconfig/tesoreriaconfig');
INSERT INTO sysmenu VALUES (840, '2431', 'csPreGModifyConfigTicket', 1979, '1851', 0, 1, 0, 0, 0, 0, 'cTicketConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocTicketConfigEdit.cls', 925, 'edit', 'ventaconfig/ticketconfig');
INSERT INTO sysmenu VALUES (851, '2934', 'csPreGModifyConfigUsuario', 1990, '1030', 0, 1, 0, 1, 0, 0, 'cUsuarioConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocUsuarioConfig.cls', 850, 'edit', 'generalex/usuarioconfig');
INSERT INTO sysmenu VALUES (556, '5071', 'csPreCVXIEditProducto', 39015, '5025', 0, 1, 0, 0, 0, 0, 'cProducto', 'CSCVXI', 'C:proyectosCSCVXICodigocairocProducto.cls', 555, 'edit', 'cvxi/producto');
INSERT INTO sysmenu VALUES (855, '2431', 'csPreGModifyConfigVentas', 1173, '1033', 0, 1, 0, 0, 0, 0, 'cVentaConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocVentaConfigEdit.cls', 859, 'edit', 'ventaconfig/ventaconfig');
INSERT INTO sysmenu VALUES (566, '3548', 'csPreDEditDocumentoImpresora', 4013, '2569', 0, 1, 0, 0, 0, 0, 'cDocumentoImpresora', 'CSDocumento', 'C:proyectosCSDocumentoCodigocDocumentoImpresora.cls', 569, 'edit', 'documentoedit/documentoimpresora');
INSERT INTO sysmenu VALUES (622, '2049', 'csPreTsrEditConciliacionBco', 18051, '2048', 0, 1, 0, 0, 0, 0, 'cBancoConciliacion', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocBancoConciliacion.cls', 638, 'edit', 'tesoreria/bancoconciliacion');
INSERT INTO sysmenu VALUES (624, '2068', 'csPreTsrEditCashFlow', 18052, '2048', 0, 1, 0, 0, 0, 0, 'cCashFlow', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocCashFlow.cls', 638, 'edit', 'tesoreria/cashflow');
INSERT INTO sysmenu VALUES (635, '2218', 'csPreTsrEditRechazoCheque', 18050, '2048', 0, 1, 0, 0, 0, 0, 'cRechazoCheque', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocRechazoCheque.cls', 638, 'edit', 'tesoreria/rechazocheque');
INSERT INTO sysmenu VALUES (706, '3625', 'csPreGEditAjusteInflacionIndice', 1255, '1032', 0, 1, 0, 0, 0, 0, 'cAjusteInflacionIndice', 'CSGeneral', 'C:proyectosCSGeneralCodigocAjusteInflacionIndice.cls', 834, 'edit', 'general/ajusteinflacionindice');
INSERT INTO sysmenu VALUES (770, '3938', 'csPreGImportarAsientos', 1986, '1032', 0, 1, 0, 0, 0, 0, 'cImportAsiento', 'CSGeneral', 'C:proyectosCSGeneralCodigocImportAsiento.cls', 834, 'import', 'contabilidadconfig/importasiento');
INSERT INTO sysmenu VALUES (927, '1028', 'csMenuConfig', NULL, '', 0, 1, 0, 1, 0, 0, '', 'CSGeneral', '', NULL, '', '');
INSERT INTO sysmenu VALUES (468, '2383', 'csMenuConfig', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSEnvio', 'C:proyectosCSEnvioCodigocEnvioConfig.cls', 927, '', '');
INSERT INTO sysmenu VALUES (480, '2312', 'csMenuConfig', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSEnvio', 'C:proyectosCSEnvioCodigocLegajoTipo.cls', 927, '', '');
INSERT INTO sysmenu VALUES (495, '2418', 'csMenuExportacionConfig', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSExport', 'C:proyectosCSExportCodigocExportConfig.cls', 927, '', '');
INSERT INTO sysmenu VALUES (543, '2955', 'csCDMenuConfig', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSCDTeka', 'C:proyectosCSCDTekaCodigocCDRom.cls', 927, '', '');
INSERT INTO sysmenu VALUES (478, '2312', 'csMenuEnvio', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSEnvio', 'C:proyectosCSEnvioCodigocLegajo.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (482, '2367', 'csMenuAgenda', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSEnvio', 'C:proyectosCSEnvioCodigocParteDiario.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (484, '2383', 'csMenuEnvio', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSEnvio', 'C:proyectosCSEnvioCodigocPresupuestoEnvio.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (506, '5134', 'csMenuExportacion', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSExport', 'C:proyectosCSExportCodigocPackingList.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (545, '2955', 'csCDMenuList', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSCDTeka', 'C:proyectosCSCDTekaCodigocCDRomListDoc.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (559, '4999', 'csMenuConfig', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSCVXI', 'C:proyectosCSCVXICodigocairocTexto.cls', 927, '', '');
INSERT INTO sysmenu VALUES (772, '5054', 'csPreGVentaImportOS', 1981, '1033', 0, 1, 0, 0, 0, 0, 'cImportOrdenServicio', 'CSGeneral', 'C:proyectosCSGeneralCodigocImportOrdenServicio.cls', 859, 'import', 'ventaconfig/importordenservicio');
INSERT INTO sysmenu VALUES (774, '4916', 'csPreGContImportPadronEmbargo', 1982, '1032', 0, 1, 0, 0, 0, 0, 'cImportPadEmbargo', 'CSGeneral', 'C:proyectosCSGeneralCodigocImportPadronEmbargo.cls', 834, 'import', 'contabilidadconfig/importpadembargo');
INSERT INTO sysmenu VALUES (776, '3729', 'csPreGContImportPercRetIIBB', 1987, '1032', 0, 1, 0, 0, 0, 0, 'cImportPercRetIIBB', 'CSGeneral', 'C:proyectosCSGeneralCodigocImportPercRetIIBB.cls', 834, 'import', 'contabilidadconfig/importpercretiibb');
INSERT INTO sysmenu VALUES (806, '1031', 'csPreGListProducto', 1079, '1031', 0, 1, 0, 0, 0, 0, 'cProducto', 'CSGeneral', 'C:proyectosCSGeneralCodigocProducto.cls', 848, 'list', 'general/producto');
INSERT INTO sysmenu VALUES (477, '3274', 'csPreExpListExpoGrupoPrecio', 22508, '2418', 0, 1, 0, 0, 0, 0, 'cExpoGrupoPrecio', 'CSExportPrint', 'C:proyectosCSExportPrintCodigocExpoGrupoPrecio.cls', 495, 'list', 'exportprint/expogrupoprecio');
INSERT INTO sysmenu VALUES (479, '2325', 'csPreEnvListLegajo', 15004, '2312', 0, 1, 0, 0, 0, 0, 'cLegajo', 'CSEnvio', 'C:proyectosCSEnvioCodigocLegajo.cls', 480, 'list', 'envio/legajo');
INSERT INTO sysmenu VALUES (481, '2346', 'csPreEnvListLegajoTipo', 15021, '2312', 0, 1, 0, 0, 0, 0, 'cLegajoTipo', 'CSEnvio', 'C:proyectosCSEnvioCodigocLegajoTipo.cls', 480, 'list', 'envio/legajotipo');
INSERT INTO sysmenu VALUES (916, '2660', 'csPreTareaListPrioridad', 2007, '1851', 0, 1, 0, 0, 0, 0, 'cPrioridad', 'CSTask', 'C:proyectosCSTaskCodigocPrioridad.cls', 925, 'list', 'tarea/prioridad');
INSERT INTO sysmenu VALUES (918, '2662', 'csPreTareaListProyecto', 2019, '1851', 0, 1, 0, 0, 0, 0, 'cProyecto', 'CSTask', 'C:proyectosCSTaskCodigocProyecto.cls', 925, 'list', 'tarea/proyecto');
INSERT INTO sysmenu VALUES (700, '2733', 'csPreIModifyConfig', 7013, '2732', 0, 1, 0, 0, 0, 0, 'cInformeConfig', 'CSInforme', 'C:proyectosCSInformeCodigocInformeConfig.cls', 699, 'edit', 'informe/informeconfig');
INSERT INTO sysmenu VALUES (740, '2431', 'csPreGModifyConfigCompras', 1175, '1381', 0, 1, 0, 0, 0, 0, 'cCompraConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocCompraConfigEdit.cls', 825, 'edit', 'compraconfig/compraconfig');
INSERT INTO sysmenu VALUES (745, '2431', 'csPreGModifyConfigContabilidad', 1988, '1032', 0, 1, 0, 0, 0, 0, 'cContConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocContabilidadConfigEdit.cls', 834, 'edit', 'contabilidadconfig/contconfig');
INSERT INTO sysmenu VALUES (801, '2431', 'csPreGModifyConfigPersonal', 1985, '3973', 0, 1, 0, 0, 0, 0, 'cPersonalConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocPersonalConfigEdit.cls', 800, 'edit', 'personalconfig/personalconfig');
INSERT INTO sysmenu VALUES (532, '5111', 'csPreVtaCobranzasCajero', 16040, '1589', 0, 1, 0, 0, 0, 0, 'cCobranzaMenu', 'CSVenta', 'C:proyectosCSCairoModulosCSVentasCSVentaCodigocCobranzaMenu.cls', 656, 'edit', 'venta/cobranzamenu');
INSERT INTO sysmenu VALUES (548, '5035', 'csPreCVXIBrowser', 39014, '5025', 0, 1, 0, 0, 0, 0, 'cBrowser', 'CSCVXI', 'C:proyectosCSCVXICodigocairocBrowser.cls', 555, 'show', 'cvxi/browser');
INSERT INTO sysmenu VALUES (677, '1970', 'csPreConRenumerarAsientos', 19009, '1742', 0, 1, 0, 0, 0, 0, 'cAsientosEdit', 'CSContabilidad', 'C:proyectosCSCairoModulosCSContabilidadCSContabilidadCodigocAsientosEdit.cls', 678, 'edit', 'contabilidad/asientosedit');
INSERT INTO sysmenu VALUES (699, '2732', 'csMenuConfigInformes', 7013, '2703', 0, 1, 0, 1, 0, 1, 'cInformeConfig', 'CSInforme', 'C:proyectosCSInformeCodigocInformeConfig.cls', 883, 'edit', 'informe/informeconfig');
INSERT INTO sysmenu VALUES (483, '2368', 'csPreEnvListParteDiario', 15008, '2367', 0, 1, 0, 0, 0, 0, 'cParteDiario', 'CSEnvio', 'C:proyectosCSEnvioCodigocParteDiario.cls', 482, 'list', 'envio/partediario');
INSERT INTO sysmenu VALUES (490, '2419', 'csPreExpListAduana', 22004, '2418', 0, 1, 0, 0, 0, 0, 'cAduana', 'CSExport', 'C:proyectosCSExportCodigocAduana.cls', 495, 'list', 'export/aduana');
INSERT INTO sysmenu VALUES (494, '2423', 'csPreExpListEmbarque', 22008, '5134', 0, 1, 0, 0, 0, 0, 'cEmbarque', 'CSExport', 'C:proyectosCSExportCodigocEmbarque.cls', 506, 'list', 'export/embarque');
INSERT INTO sysmenu VALUES (503, '2512', 'csPreExpListManifiestoCarga', 22018, '5134', 0, 1, 0, 0, 0, 0, 'cManifiestoCarga', 'CSExport', 'C:proyectosCSExportCodigocManifiestoCarga.cls', 506, 'list', 'export/manifiestocarga');
INSERT INTO sysmenu VALUES (507, '2520', 'csPreExpListPackingList', 22023, '5134', 0, 1, 0, 0, 0, 0, 'cPackingList', 'CSExport', 'C:proyectosCSExportCodigocPackingList.cls', 506, 'list', 'export/packinglist');
INSERT INTO sysmenu VALUES (511, '1754', 'csPreTickListAlarma', 28010, '1851', 0, 1, 0, 0, 0, 0, 'cAlarma', 'CSTicket', 'C:proyectosCSCairoModulosCSVentasCSTicketCodigocAlarma.cls', 925, 'list', 'ticket/alarma');
INSERT INTO sysmenu VALUES (569, '2569', 'csMenuConfigDocumentos', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSDocumento', 'C:proyectosCSDocumentoCodigocTalonarioEdit.cls', 927, '', '');
INSERT INTO sysmenu VALUES (575, '3236', 'csMenuConfig', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSEmpaque', 'C:proyectosCSEmpaqueCodigocConfiguracionCalibradora.cls', 927, '', '');
INSERT INTO sysmenu VALUES (592, '4582', 'csMenuPersonalMain', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocLiquidacion.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (619, '1998', 'csMenuStock', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSStock', 'C:proyectosCSCairoModulosCSStockCSStockCodigocStockProveedor.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (513, '1793', 'csPreTickListAlarmaItemTipo', 28021, '1851', 0, 1, 0, 0, 0, 0, 'cAlarmaItemTipo', 'CSTicket', 'C:proyectosCSCairoModulosCSVentasCSTicketCodigocAlarmaItemTipo.cls', 925, 'list', 'ticket/alarmaitemtipo');
INSERT INTO sysmenu VALUES (517, '1800', 'csPreTickListEquipos', 28011, '1755', 0, 1, 0, 0, 0, 0, 'cEquipo', 'CSTicket', 'C:proyectosCSCairoModulosCSVentasCSTicketCodigocEquipo.cls', 923, 'list', 'ticket/equipo');
INSERT INTO sysmenu VALUES (519, '1807', 'csPreTickListEquipoDetalle', 28029, '1851', 0, 1, 0, 0, 0, 0, 'cEquipoDetalle', 'CSTicket', 'C:proyectosCSCairoModulosCSVentasCSTicketCodigocEquipoDetalle.cls', 925, 'list', 'ticket/equipodetalle');
INSERT INTO sysmenu VALUES (521, '1829', 'csPreTickListEquipoTipoFalla', 28025, '1851', 0, 1, 0, 0, 0, 0, 'cEquipoTipoFalla', 'CSTicket', 'C:proyectosCSCairoModulosCSVentasCSTicketCodigocEquipoTipoFalla.cls', 925, 'list', 'ticket/equipotipofalla');
INSERT INTO sysmenu VALUES (523, '3262', 'csPreTickListMail', 28033, '1851', 0, 1, 0, 0, 0, 0, 'cMail', 'CSTicket', 'C:proyectosCSCairoModulosCSVentasCSTicketCodigocMail.cls', 925, 'list', 'ticket/mail');
INSERT INTO sysmenu VALUES (526, '1838', 'csPreTickListOrdenServ', 28003, '1755', 0, 1, 0, 0, 0, 0, 'cOrdenServicio', 'CSTicket', 'C:proyectosCSCairoModulosCSVentasCSTicketCodigocOrdenServicio.cls', 923, 'list', 'ticket/ordenservicio');
INSERT INTO sysmenu VALUES (528, '1850', 'csPreTickListParteReparacion', 28015, '1755', 0, 1, 0, 0, 0, 0, 'cParteReparacion', 'CSTicket', 'C:proyectosCSCairoModulosCSVentasCSTicketCodigocParteReparacion.cls', 923, 'list', 'ticket/partereparacion');
INSERT INTO sysmenu VALUES (530, '4725', 'csPreVtaListCaja', 16032, '1589', 0, 1, 0, 0, 0, 0, 'cCaja', 'CSVenta', 'C:proyectosCSCairoModulosCSVentasCSVentaCodigocCaja.cls', 656, 'list', 'venta/caja');
INSERT INTO sysmenu VALUES (536, '3747', 'csPreVtaListHojaRuta', 16028, '1589', 0, 1, 0, 0, 0, 0, 'cHojaRuta', 'CSVenta', 'C:proyectosCSCairoModulosCSVentasCSVentaCodigocHojaRuta.cls', 656, 'list', 'venta/hojaruta');
INSERT INTO sysmenu VALUES (538, '4862', 'csPreVtaListPickingList', 16038, '1589', 0, 1, 0, 0, 0, 0, 'cPickingList', 'CSVenta', 'C:proyectosCSCairoModulosCSVentasCSVentaCodigocPickingList.cls', 656, 'list', 'venta/pickinglist');
INSERT INTO sysmenu VALUES (540, '1709', 'csPreVtaListPresupuesto', 16020, '1589', 0, 1, 0, 0, 0, 0, 'cPresupuestoVenta', 'CSVenta', 'C:proyectosCSCairoModulosCSVentasCSVentaCodigocPresupuestoVenta.cls', 656, 'list', 'venta/presupuestoventa');
INSERT INTO sysmenu VALUES (542, '1719', 'csPreVtaListRemito', 16009, '1589', 0, 1, 0, 0, 0, 0, 'cRemitoVenta', 'CSVenta', 'C:proyectosCSCairoModulosCSVentasCSVentaCodigocRemitoVenta.cls', 656, 'list', 'venta/remitoventa');
INSERT INTO sysmenu VALUES (550, '5030', 'csPreCVXIListComunidad', 39013, '4999', 0, 1, 0, 0, 0, 0, 'cComunidadInternet', 'CSCVXI', 'C:proyectosCSCVXICodigocairocComunidadInternet.cls', 559, 'list', 'cvxi/comunidadinternet');
INSERT INTO sysmenu VALUES (552, '5024', 'csPreCVXIListEmail', 39009, '5025', 0, 1, 0, 0, 0, 0, 'cEmail', 'CSCVXI', 'C:proyectosCSCVXICodigocairocEmail.cls', 555, 'list', 'cvxi/email');
INSERT INTO sysmenu VALUES (554, '5096', 'csPreCVXIListPregunta', 39017, '5025', 0, 1, 0, 0, 0, 0, 'cPregunta', 'CSCVXI', 'C:proyectosCSCVXICodigocairocPregunta.cls', 555, 'list', 'cvxi/pregunta');
INSERT INTO sysmenu VALUES (558, '5000', 'csPreCVXIListRespuestaPlantilla', 39004, '4999', 0, 1, 0, 0, 0, 0, 'cRespuestaPlantilla', 'CSCVXI', 'C:proyectosCSCVXICodigocairocRespuestaPlantilla.cls', 559, 'list', 'cvxi/respuestaplantilla');
INSERT INTO sysmenu VALUES (560, '5014', 'csPreCVXIListTexto', 39008, '4999', 0, 1, 0, 0, 0, 0, 'cTexto', 'CSCVXI', 'C:proyectosCSCVXICodigocairocTexto.cls', 559, 'list', 'cvxi/texto');
INSERT INTO sysmenu VALUES (574, '3253', 'csPreEmpqListCalibradora', 1000040, '3236', 0, 1, 0, 0, 0, 0, 'cCalibradora', 'CSEmpaque', 'C:proyectosCSEmpaqueCodigocCalibradora.cls', 575, 'list', 'empaque/calibradora');
INSERT INTO sysmenu VALUES (576, '3240', 'csPreEmpqListCfgCalibradora', 1000036, '3236', 0, 1, 0, 0, 0, 0, 'cConfiguracionCalibradora', 'CSEmpaque', 'C:proyectosCSEmpaqueCodigocConfiguracionCalibradora.cls', 575, 'list', 'empaque/configuracioncalibradora');
INSERT INTO sysmenu VALUES (578, '4693', 'csPreEListCurso', 37020, '4690', 0, 1, 0, 0, 0, 0, 'cCurso', 'CSEducacion', 'C:proyectosCSCairoModulosCSEducacionCSEducacionCodigocCurso.cls', 680, 'list', 'edu/curso');
INSERT INTO sysmenu VALUES (582, '4677', 'csPreEListProfesor', 37012, '4667', 0, 1, 0, 0, 0, 0, 'cProfesor', 'CSEducacion', 'C:proyectosCSCairoModulosCSEducacionCSEducacionCodigocProfesor.cls', 682, 'list', 'edu/profesor');
INSERT INTO sysmenu VALUES (584, '4524', 'csPrePListEmpleado', 35016, '3972', 0, 1, 0, 0, 0, 0, 'cEmpleado', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocEmpleado.cls', 799, 'list', 'personal/empleado');
INSERT INTO sysmenu VALUES (587, '4589', 'csPrepListEmpleadoAsistenciaTipo', 35036, '3972', 0, 1, 0, 0, 0, 0, 'cEmpleadoAsistenciaTipo', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocEmpleadoAsistenciaTipo.cls', 799, 'list', 'personal/empleadoasistenciatipo');
INSERT INTO sysmenu VALUES (589, '4520', 'csPrePListEmpleadoEspecialidad', 35012, '3972', 0, 1, 0, 0, 0, 0, 'cEmpleadoEspecialidad', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocEmpleadoEspecialidad.cls', 799, 'list', 'personal/empleadoespecialidad');
INSERT INTO sysmenu VALUES (591, '4583', 'csPrePListEmpleadoPeriodo', 35032, '4582', 0, 1, 0, 0, 0, 0, 'cEmpleadoPeriodo', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocEmpleadoPeriodo.cls', 592, 'list', 'personal/empleadoperiodo');
INSERT INTO sysmenu VALUES (593, '4610', 'csPrepListLiquidacion', 35040, '4582', 0, 1, 0, 0, 0, 0, 'cLiquidacion', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocLiquidacion.cls', 592, 'list', 'personal/liquidacion');
INSERT INTO sysmenu VALUES (596, '4843', 'csPrepListLiquidacionCodigoTipo', 35046, '3973', 0, 1, 0, 0, 0, 0, 'cLiquidacionCodigoTipo', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocLiquidacionCodigoTipo.cls', 800, 'list', 'personal/liquidacioncodigotipo');
INSERT INTO sysmenu VALUES (862, '3332', 'csPreImpSQLEditTables', 21006, '3287', 0, 1, 0, 0, 0, 0, 'cEditTables', 'CSImplementacion', 'C:proyectosCSImplementacionCodigocEditTables.cls', 863, 'edit', 'impsql/edittables');
INSERT INTO sysmenu VALUES (866, '3336', 'csPreImporExecImport', 23005, '3335', 0, 1, 0, 0, 0, 0, 'cImport', 'CSImport', 'C:proyectosCSImportCodigocImport.cls', 867, 'import', 'import/import');
INSERT INTO sysmenu VALUES (871, '3364', 'csInfoAFIPMakeAFIPEsquema', 6004, '3362', 0, 1, 0, 0, 0, 0, 'cAFIPEsquema', 'CSInfoAFIP', 'C:proyectosCSInfoAFIPCodigocAFIPEsquema.cls', 869, 'edit', 'infoafip/afipesquema');
INSERT INTO sysmenu VALUES (599, '4565', 'csPrePListLiquidacionFormula', 35028, '3973', 0, 1, 0, 0, 0, 0, 'cLiquidacionFormula', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocLiquidacionFormula.cls', 800, 'list', 'personal/liquidacionformula');
INSERT INTO sysmenu VALUES (602, '4551', 'csPrePListLiquidacionPlantilla', 35024, '3973', 0, 1, 0, 0, 0, 0, 'cLiquidacionPlantilla', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocLiquidacionPlantilla.cls', 800, 'list', 'personal/liquidacionplantilla');
INSERT INTO sysmenu VALUES (605, '3971', 'csPrePListSindicato', 35004, '3973', 0, 1, 0, 0, 0, 0, 'cSindicato', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocSindicato.cls', 800, 'list', 'personal/sindicato');
INSERT INTO sysmenu VALUES (608, '4508', 'csPrePListSindicatoConvenio', 35008, '3973', 0, 1, 0, 0, 0, 0, 'cSindicatoConvenio', 'CSPersonal', 'C:proyectosCSCairoModulosCSPersonalCSPersonalCodigocSindicatoConvenio.cls', 800, 'list', 'personal/sindicatoconvenio');
INSERT INTO sysmenu VALUES (610, '3723', 'csPreStListOrdenProdKit', 20026, '1998', 0, 1, 0, 0, 0, 0, 'cOrdenProdKit', 'CSStock', 'C:proyectosCSCairoModulosCSStockCSStockCodigocOrdenProdKit.cls', 619, 'list', 'stock/ordenprodkit');
INSERT INTO sysmenu VALUES (612, '1999', 'csPreStListParteProdKit', 20014, '1998', 0, 1, 0, 0, 0, 0, 'cParteProdKit', 'CSStock', 'C:proyectosCSCairoModulosCSStockCSStockCodigocParteProdKit.cls', 619, 'list', 'stock/parteprodkit');
INSERT INTO sysmenu VALUES (614, '2254', 'csPreStListRecuentoStock', 20010, '1998', 0, 1, 0, 0, 0, 0, 'cRecuentoStock', 'CSStock', 'C:proyectosCSCairoModulosCSStockCSStockCodigocRecuentoStock.cls', 619, 'list', 'stock/recuentostock');
INSERT INTO sysmenu VALUES (616, '2016', 'csPreStListStock', 20004, '1998', 0, 1, 0, 0, 0, 0, 'cStock', 'CSStock', 'C:proyectosCSCairoModulosCSStockCSStockCodigocStock.cls', 619, 'list', 'stock/stock');
INSERT INTO sysmenu VALUES (618, '2022', 'csPreStListStockCliente', 20022, '1998', 0, 1, 0, 1, 0, 0, 'cStockCliente', 'CSStock', 'C:proyectosCSCairoModulosCSStockCSStockCodigocStockCliente.cls', 619, 'list', 'stock/stockcliente');
INSERT INTO sysmenu VALUES (620, '2030', 'csPreStListStockProveedor', 20018, '1998', 0, 1, 0, 1, 0, 0, 'cStockProveedor', 'CSStock', 'C:proyectosCSCairoModulosCSStockCSStockCodigocStockProveedor.cls', 619, 'list', 'stock/stockproveedor');
INSERT INTO sysmenu VALUES (626, '2112', 'csPreTsrListCobranza', 18010, '2048', 0, 1, 0, 0, 0, 0, 'cCobranza', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocCobranza.cls', 638, 'list', 'tesoreria/cobranza');
INSERT INTO sysmenu VALUES (628, '2163', 'csPreTsrListDepositoBanco', 18035, '2048', 0, 1, 0, 0, 0, 0, 'cDepositoBanco', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocDepositoBanco.cls', 638, 'list', 'tesoreria/depositobanco');
INSERT INTO sysmenu VALUES (630, '2183', 'csPreTsrListDepositoCupon', 18041, '2048', 0, 1, 0, 0, 0, 0, 'cDepositoCupon', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocDepositoCupon.cls', 638, 'list', 'tesoreria/depositocupon');
INSERT INTO sysmenu VALUES (632, '2192', 'csPreTsrListMovimientoFondo', 18023, '2048', 0, 1, 0, 0, 0, 0, 'cMovimientoFondo', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocMovimientoFondo.cls', 638, 'list', 'tesoreria/movimientofondo');
INSERT INTO sysmenu VALUES (634, '2196', 'csPreTsrListOrdenPago', 18017, '2048', 0, 1, 0, 0, 0, 0, 'cOrdenPago', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocOrdenPago.cls', 638, 'list', 'tesoreria/ordenpago');
INSERT INTO sysmenu VALUES (639, '2234', 'csPreTsrListResolucionCupon', 18047, '2048', 0, 1, 0, 0, 0, 0, 'cResolucionCupon', 'CSTesoreria', 'C:proyectosCSCairoModulosCSTesoreriaCSTesoreriaCodigocResolucionCupon.cls', 638, 'list', 'tesoreria/resolucioncupon');
INSERT INTO sysmenu VALUES (642, '3220', 'csPreAListAlarmaMail', 30004, '2703', 0, 1, 0, 1, 0, 0, 'cAlarmaMail', 'CSAlarmaMail', 'C:proyectosCSAlarmaMailCodigoConfigcAlarmaMail.cls', 883, 'list', 'alarmamailcfg/alarmamail');
INSERT INTO sysmenu VALUES (657, '1590', 'csPrePVListPedidoVta', 3003, '1589', 0, 1, 0, 0, 0, 0, 'cPedidoVenta', 'CSPedidoVenta', 'C:proyectosCSCairoModulosCSVentasCSPedidoVentaCodigocPedidoVenta.cls', 656, 'list', 'pedidoventa/pedidoventa');
INSERT INTO sysmenu VALUES (665, '1880', 'csPreCpraListDespImpoCalc', 17046, '1879', 0, 1, 0, 0, 0, 0, 'cDespachoImpCalculo', 'CSCompras', 'C:proyectosCSCairoModulosCSComprasCSCompraCodigocDespachoImpCalculo.cls', 672, 'list', 'compra/despachoimpcalculo');
INSERT INTO sysmenu VALUES (667, '1906', 'csPreCpraListFactura', 17005, '1879', 0, 1, 0, 0, 0, 0, 'cFacturaCompra', 'CSCompras', 'C:proyectosCSCairoModulosCSComprasCSCompraCodigocFacturaCompra.cls', 672, 'list', 'compra/facturacompra');
INSERT INTO sysmenu VALUES (669, '1926', 'csPreCpraListOrden', 17024, '1879', 0, 1, 0, 0, 0, 0, 'cOrdenCompra', 'CSCompras', 'C:proyectosCSCairoModulosCSComprasCSCompraCodigocOrdenCompra.cls', 672, 'list', 'compra/ordencompra');
INSERT INTO sysmenu VALUES (687, '1125', 'csPreGListCuentaGrupo', 1172, '1032', 0, 1, 0, 0, 0, 0, 'cCuentaGrupo', 'CSGeneral', 'C:proyectosCSGeneralCodigocCuentaGrupo.cls', 834, 'list', 'general/cuentagrupo');
INSERT INTO sysmenu VALUES (689, '3507', 'csPreGListListaPrecioMarcado', 1246, '1031', 0, 1, 0, 0, 0, 0, 'cListaPrecioMarcado', 'CSGeneral', 'C:proyectosCSGeneralCodigocListaPrecioMarcado.cls', 848, 'list', 'general/listapreciomarcado');
INSERT INTO sysmenu VALUES (691, '1243', 'csPreGListMarca', 1139, '1031', 0, 1, 0, 0, 0, 0, 'cMarca', 'CSGeneral', 'C:proyectosCSGeneralCodigocMarca.cls', 848, 'list', 'general/marca');
INSERT INTO sysmenu VALUES (693, '2928', 'csPreGListStockLote', 1991, '2927', 0, 1, 0, 0, 0, 0, 'cStockLote', 'CSGeneral', 'C:proyectosCSGeneralCodigocStockLote.cls', 692, 'list', 'generalex/stocklote');
INSERT INTO sysmenu VALUES (696, '5041', 'csPreGListTarifario', 1283, '1033', 0, 1, 0, 0, 0, 0, 'cTarifario', 'CSGeneral', 'C:proyectosCSGeneralCodigocTarifario.cls', 859, 'list', 'general/tarifario');
INSERT INTO sysmenu VALUES (697, '2704', 'csPreIListInforme', 7004, '2703', 0, 1, 0, 0, 0, 0, 'cInforme', 'CSInforme', 'C:proyectosCSInformeCodigocInforme.cls', 883, 'list', 'informe/informe');
INSERT INTO sysmenu VALUES (698, '2705', 'csPreIListInforme * -1', 7004, '2703', 0, 1, 0, 0, 0, 0, 'cInforme', 'CSInforme', 'C:proyectosCSInformeCodigocInforme.cls', 883, 'list', 'informe/informe');
INSERT INTO sysmenu VALUES (704, '3611', 'csPreGListAjusteInflacion', 1254, '1032', 0, 1, 0, 0, 0, 0, 'cAjusteInflacion', 'CSGeneral', 'C:proyectosCSGeneralCodigocAjusteInflacion.cls', 834, 'list', 'general/ajusteinflacion');
INSERT INTO sysmenu VALUES (708, '1041', 'csPreGListBanco', 1035, '1029', 0, 1, 0, 0, 0, 0, 'cBanco', 'CSGeneral', 'C:proyectosCSGeneralCodigocBanco.cls', 836, 'list', 'general/banco');
INSERT INTO sysmenu VALUES (710, '3498', 'csPreGListCaja', 1242, '1029', 0, 1, 0, 0, 0, 0, 'cCaja', 'CSGeneral', 'C:proyectosCSGeneralCodigocCaja.cls', 836, 'list', 'general/caja');
INSERT INTO sysmenu VALUES (712, '1044', 'csPreGListCalidad', 1135, '1031', 0, 1, 0, 0, 0, 0, 'cCalidad', 'CSGeneral', 'C:proyectosCSGeneralCodigocCalidad.cls', 848, 'list', 'general/calidad');
INSERT INTO sysmenu VALUES (714, '3923', 'csPreGListCalle', 1263, '1030', 0, 1, 0, 0, 0, 0, 'cCalle', 'CSGeneral', 'C:proyectosCSGeneralCodigocCalle.cls', 850, 'list', 'general/calle');
INSERT INTO sysmenu VALUES (716, '1053', 'csPreGListCamion', 1143, '1052', 0, 1, 0, 0, 0, 0, 'cCamion', 'CSGeneral', 'C:proyectosCSGeneralCodigocCamion.cls', 846, 'list', 'general/camion');
INSERT INTO sysmenu VALUES (718, '3563', 'csPreGListCatalogoWeb', 1250, '1031', 0, 1, 0, 0, 0, 0, 'cCatalogoWeb', 'CSGeneral', 'C:proyectosCSGeneralCodigocCatalogoWeb.cls', 848, 'list', 'general/catalogoweb');
INSERT INTO sysmenu VALUES (720, '4592', 'csPreGListCatalogoWebCategoria', 1267, '1031', 0, 1, 0, 0, 0, 0, 'cCatalogoWebCategoria', 'CSGeneral', 'C:proyectosCSGeneralCodigocCatalogoWebCategoria.cls', 848, 'list', 'general/catalogowebcategoria');
INSERT INTO sysmenu VALUES (722, '1056', 'csPreGListCentroCosto', 1055, '1032', 0, 1, 0, 0, 0, 0, 'cCentroCosto', 'CSGeneral', 'C:proyectosCSGeneralCodigocCentroCosto.cls', 834, 'list', 'general/centrocosto');
INSERT INTO sysmenu VALUES (724, '3109', 'csPreGListChequera', 1131, '1029', 0, 1, 0, 0, 0, 0, 'cChequera', 'CSGeneral', 'C:proyectosCSGeneralCodigocChequeraEdit.cls', 836, 'list', 'tesoreriaconfig/chequera');
INSERT INTO sysmenu VALUES (726, '1062', 'csPreGListChofer', 1147, '1052', 0, 1, 0, 0, 0, 0, 'cChofer', 'CSGeneral', 'C:proyectosCSGeneralCodigocChofer.cls', 846, 'list', 'general/chofer');
INSERT INTO sysmenu VALUES (728, '1074', 'csPreGListCircuitoContable', 1200, '1032', 0, 1, 0, 1, 0, 0, 'cCircuitoContable', 'CSGeneral', 'C:proyectosCSGeneralCodigocCircuitoContable.cls', 834, 'list', 'general/circuitocontable');
INSERT INTO sysmenu VALUES (804, '4970', 'csPreGListPosicionArancel', 1279, '1031', 0, 1, 0, 0, 0, 0, 'cPosicionArancel', 'CSGeneral', 'C:proyectosCSGeneralCodigocPosicionArancel.cls', 848, 'list', 'general/posicionarancel');
INSERT INTO sysmenu VALUES (808, '1362', 'csPreGListProductoFKit', 1229, '1031', 0, 1, 0, 0, 0, 0, 'cProductoFormulaKit', 'CSGeneral', 'C:proyectosCSGeneralCodigocProductoFormulaKit.cls', 848, 'list', 'general/productoformulakit');
INSERT INTO sysmenu VALUES (810, '3910', 'csPreGListProductoHelpConfig', 1259, '1031', 0, 1, 0, 0, 0, 0, 'cProductoHelpConfig', 'CSGeneral', 'C:proyectosCSGeneralCodigocProductoHelpConfig.cls', 848, 'list', 'general/productohelpconfig');
INSERT INTO sysmenu VALUES (812, '1382', 'csPreGListProveedor', 1075, '1381', 0, 1, 0, 0, 0, 0, 'cProveedor', 'CSGeneral', 'C:proyectosCSGeneralCodigocProveedor.cls', 825, 'list', 'general/proveedor');
INSERT INTO sysmenu VALUES (814, '1412', 'csPreGListProvincia', 1115, '1030', 0, 1, 0, 0, 0, 0, 'cProvincia', 'CSGeneral', 'C:proyectosCSGeneralCodigocProvincia.cls', 850, 'list', 'general/provincia');
INSERT INTO sysmenu VALUES (816, '1415', 'csPreGListReglaLiquidacion', 1063, '1033', 0, 1, 0, 0, 0, 0, 'cReglaLiquidacion', 'CSGeneral', 'C:proyectosCSGeneralCodigocReglaLiquidacion.cls', 859, 'list', 'general/reglaliquidacion');
INSERT INTO sysmenu VALUES (818, '1419', 'csPreGListRetencion', 1188, '1032', 0, 1, 0, 0, 0, 0, 'cRetencion', 'CSGeneral', 'C:proyectosCSGeneralCodigocRetencion.cls', 834, 'list', 'general/retencion');
INSERT INTO sysmenu VALUES (820, '1423', 'csPreGListRetencionTipo', 1192, '1032', 0, 1, 0, 0, 0, 0, 'cRetencionTipo', 'CSGeneral', 'C:proyectosCSGeneralCodigocRetencionTipo.cls', 834, 'list', 'general/retenciontipo');
INSERT INTO sysmenu VALUES (822, '1429', 'csPreGListRubro', 1083, '1031', 0, 1, 0, 0, 0, 0, 'cRubro', 'CSGeneral', 'C:proyectosCSGeneralCodigocRubro.cls', 848, 'list', 'general/rubro');
INSERT INTO sysmenu VALUES (824, '1455', 'csPreGListRubroTabla', 1164, '1031', 0, 1, 0, 0, 0, 0, 'cRubroTabla', 'CSGeneral', 'C:proyectosCSGeneralCodigocRubroTabla.cls', 848, 'list', 'general/rubrotabla');
INSERT INTO sysmenu VALUES (833, '1472', 'csPreGListTarjetaCredito', 1043, '1029', 0, 1, 0, 0, 0, 0, 'cTarjetaCredito', 'CSGeneral', 'C:proyectosCSGeneralCodigocTarjetaCredito.cls', 836, 'list', 'general/tarjetacredito');
INSERT INTO sysmenu VALUES (835, '1485', 'csPreGListTasaImpositiva', 1123, '1032', 0, 1, 0, 0, 0, 0, 'cTasaImpositiva', 'CSGeneral', 'C:proyectosCSGeneralCodigocTasaImpositiva.cls', 834, 'list', 'general/tasaimpositiva');
INSERT INTO sysmenu VALUES (843, '1493', 'csPreGListTipoOperacion', 1221, '1033', 0, 1, 0, 0, 0, 0, 'cTipoOperacion', 'CSGeneral', 'C:proyectosCSGeneralCodigocTipoOperacion.cls', 859, 'list', 'general/tipooperacion');
INSERT INTO sysmenu VALUES (847, '1497', 'csPreGListTransporte', 1091, '1052', 0, 1, 0, 0, 0, 0, 'cTransporte', 'CSGeneral', 'C:proyectosCSGeneralCodigocTransporte.cls', 846, 'list', 'general/transporte');
INSERT INTO sysmenu VALUES (849, '1500', 'csPreGListUnidad', 1023, '1031', 0, 1, 0, 0, 0, 0, 'cUnidad', 'CSGeneral', 'C:proyectosCSGeneralCodigocUnidad.cls', 848, 'list', 'general/unidad');
INSERT INTO sysmenu VALUES (853, '1503', 'csPreGListVendedores', 1039, '1033', 0, 1, 0, 0, 0, 0, 'cVendedores', 'CSGeneral', 'C:proyectosCSGeneralCodigocVendedores.cls', 859, 'list', 'general/vendedores');
INSERT INTO sysmenu VALUES (922, '2685', 'csPreTareaListTarea', 2003, '1755', 0, 1, 0, 0, 0, 0, 'cTarea', 'CSTask', 'C:proyectosCSTaskCodigocTarea.cls', 923, 'list', 'tarea/tarea');
INSERT INTO sysmenu VALUES (924, '2686', 'csPreTareaListTareaPlantilla', 2003, '1755', 0, 1, 0, 0, 0, 0, 'cTarea', 'CSTask', 'C:proyectosCSTaskCodigocTarea.cls', 923, 'list', 'tarea/tarea');
INSERT INTO sysmenu VALUES (678, '1742', 'csMenuContabilidad', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSContabilidad', 'C:proyectosCSCairoModulosCSContabilidadCSContabilidadCodigocEjercicioContable.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (680, '4690', 'csMenuEduMain', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSEducacion', 'C:proyectosCSCairoModulosCSEducacionCSEducacionCodigocAlumno.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (894, '3041', 'csMenuConfig', NULL, '1028', 1, 0, 0, 0, 1, 0, '', 'CSProduccion', 'C:proyectosCSProduccionCodigocProductoBOM.cls', 927, '', '');
INSERT INTO sysmenu VALUES (905, '3690', 'csSocios', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSSGR', 'C:proyectosCSSGRCodigocSocioForm.cls', 927, '', '');
INSERT INTO sysmenu VALUES (896, '3700', 'csAvales', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSSGR', 'C:proyectosCSSGRCodigocFacturaVentaSGR.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (923, '1755', 'csMenuConfig', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSTask', 'C:proyectosCSTaskCodigocTarea.cls', 927, '', '');
INSERT INTO sysmenu VALUES (925, '1851', 'csMenuConfig', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSTask', 'C:proyectosCSTaskCodigocTareaEstado.cls', 927, '', '');
INSERT INTO sysmenu VALUES (900, '3701', 'csAcciones', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSSGR', 'C:proyectosCSSGRCodigocFacturaVentaSGR.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (921, '1755', 'csMenuProyecto', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSTask', 'C:proyectosCSTaskCodigocTarea.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (471, '3243', 'csPreEmpqListEspecie', NULL, '3236', 0, 1, 0, 0, 0, 0, 'cEspecie', 'CSEmpaque', 'C:proyectosCSEmpaqueCodigocEspecie.cls', 575, '', '');
INSERT INTO sysmenu VALUES (485, '2384', 'csPreEnvListPresupuesto', NULL, '2383', 0, 1, 0, 0, 0, 0, 'cPresupuestoEnvio', 'CSEnvio', 'C:proyectosCSEnvioCodigocPresupuestoEnvio.cls', 484, '', '');
INSERT INTO sysmenu VALUES (486, '2409', 'csPreEnvListTarifa', NULL, '2312', 0, 1, 0, 0, 0, 0, 'cTarifa', 'CSEnvio', 'C:proyectosCSEnvioCodigocTarifa.cls', 480, '', '');
INSERT INTO sysmenu VALUES (487, '2412', 'csPreEnvListTipoTransporte', NULL, '2312', 0, 1, 0, 1, 0, 0, 'cTipoTransporte', 'CSEnvio', 'C:proyectosCSEnvioCodigocTipoTransporte.cls', 480, '', '');
INSERT INTO sysmenu VALUES (488, '2413', 'csPreEnvListVuelo', NULL, '2312', 0, 1, 0, 0, 0, 0, 'cVuelo', 'CSEnvio', 'C:proyectosCSEnvioCodigocVuelo.cls', 480, '', '');
INSERT INTO sysmenu VALUES (497, '', 'csPreGModifyConfigExport * -1', NULL, '2418', 0, 1, 1, 0, 0, 0, '', 'CSExport', 'C:proyectosCSExportCodigocExportConfig.cls', 495, '', '');
INSERT INTO sysmenu VALUES (544, '2956', 'csPreCDListCDRom', NULL, '2955', 0, 1, 0, 0, 0, 0, 'cCDRom', 'CSCDTeka', 'C:proyectosCSCDTekaCodigocCDRom.cls', 545, '', '');
INSERT INTO sysmenu VALUES (546, '2967', 'csPreCDSearchCDRom', NULL, '2955', 0, 1, 0, 0, 0, 0, 'cCDRomListDoc', 'CSCDTeka', 'C:proyectosCSCDTekaCodigocCDRomListDoc.cls', 545, '', '');
INSERT INTO sysmenu VALUES (692, '2927', 'csMenuStock', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocStockLote.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (759, '1029', 'csMenuConfigGeneral', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocFeriado.cls', 927, '', '');
INSERT INTO sysmenu VALUES (775, '1032', 'csMenuConfigContabilidad', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocImportPercRetIIBB.cls', 927, '', '');
INSERT INTO sysmenu VALUES (799, '3972', 'csMenuConfigMPersonal', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocPersonalConfigEdit.cls', 927, '', '');
INSERT INTO sysmenu VALUES (825, '1381', 'csMenuConfigCompras', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocSaldoInicialCompra.cls', 927, '', '');
INSERT INTO sysmenu VALUES (834, '1032', 'csMenuConfigContabilidad', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocTasaImpositiva.cls', 927, '', '');
INSERT INTO sysmenu VALUES (836, '1029', 'csMenuConfigTesoreria', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocTesoreriaConfigEdit.cls', 927, '', '');
INSERT INTO sysmenu VALUES (839, '1851', 'csMenuConfig', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocTicketConfigEdit.cls', 927, '', '');
INSERT INTO sysmenu VALUES (846, '1052', 'csMenuConfigStock', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocTransporte.cls', 927, '', '');
INSERT INTO sysmenu VALUES (850, '1030', 'csMenuConfigGeneral', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocUsuarioConfig.cls', 927, '', '');
INSERT INTO sysmenu VALUES (854, '1033', 'csMenuConfigVentas', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocVentaConfigEdit.cls', 927, '', '');
INSERT INTO sysmenu VALUES (859, '1033', 'csMenuConfigVentas', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocZona.cls', 927, '', '');
INSERT INTO sysmenu VALUES (887, '1134', 'csMenuCfgEmpresa', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSOAPI', 'C:proyectosCSOAPICodigocUsuario.cls', 927, '', '');
INSERT INTO sysmenu VALUES (892, '3041', 'csMenuConfig', NULL, '1028', 0, 1, 0, 1, 0, 1, '', 'CSProduccion', 'C:proyectosCSProduccionCodigocMaquina.cls', 927, '', '');
INSERT INTO sysmenu VALUES (848, '1031', 'csMenuConfigArticulos', NULL, '1028', 0, 1, 0, 0, 0, 1, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocUnidad.cls', 927, '', '');
INSERT INTO sysmenu VALUES (861, '3287', 'csMenuMainImpSQL', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSImplementacion', 'C:proyectosCSImplementacionCodigocEditTables.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (863, '3287', 'csMenuMainImplementacion', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSImplementacion', 'C:proyectosCSImplementacionCodigocImportacion.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (867, '3335', 'csMenuImport', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSImport', 'C:proyectosCSImportCodigocImportacionProceso.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (869, '3362', 'csMenuInformes', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSInfoAFIP', 'C:proyectosCSInfoAFIPCodigocAFIPEsquema.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (883, '2703', 'csMenuConfigSys + 500', NULL, '', 0, 1, 0, 0, 1, 0, '', 'CSOAPI', 'C:proyectosCSOAPICodigocSysmodulo.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (555, '5025', 'csMenuComunidad', NULL, '', 1, 0, 0, 0, 1, 0, '', 'CSCVXI', 'C:proyectosCSCVXICodigocairocProducto.cls', NULL, '', '');
INSERT INTO sysmenu VALUES (831, '', 'csPreGModifyConfigStock * -1', NULL, '1052', 0, 1, 1, 0, 0, 0, '', 'CSGeneral', 'C:proyectosCSGeneralCodigocStockConfigEdit.cls', 846, '', '');
INSERT INTO sysmenu VALUES (926, '2689', 'csPreTareaListTareaEstado', 2011, '1851', 0, 1, 0, 0, 0, 0, 'cTareaEstado', 'CSTask', 'C:proyectosCSTaskCodigocTareaEstado.cls', 925, 'list', 'tarea/tareaestado');


-- Completed on 2014-05-28 14:09:18 ART

--
-- PostgreSQL database dump complete
--

