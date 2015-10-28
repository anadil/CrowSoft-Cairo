/*
CrowSoft-Cairo
==============

ERP application written in Scala Play Framework and Postgresql

Copyright (C) 2012  Javier Mariano Alvarez

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS for A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

========================================================================

Created by Javier

http://www.crowsoft.com.ar

javier at crowsoft.com.ar
*/
-- Function: sp_proveedor_delete()

-- drop function sp_proveedor_delete(integer);

create or replace function sp_proveedor_delete
(
  in p_prov_id integer
)
  returns void as
$BODY$
begin

   delete from ProductoProveedor where prov_id = p_prov_id;
   delete from EmpresaProveedor where prov_id = p_prov_id;
   delete from ProveedorRetencion where prov_id = p_prov_id;
   delete from ProveedorCuentaGrupo where prov_id = p_prov_id;
   delete from ListaDescuentoProveedor where prov_id = p_prov_id;
   delete from ListaPrecioProveedor where prov_id = p_prov_id;
   delete from ProveedorCacheCredito where prov_id = p_prov_id;
   delete from ProveedorCAI where prov_id = p_prov_id;
   delete from EmpresaProveedorDeuda where prov_id = p_prov_id;
   delete from Proveedor where prov_id = p_prov_id;

   return;

exception
   when others then

     raise exception 'Ha ocurrido un error al borrar el proveedor. sp_proveedor_delete. %. %.',
                      sqlstate, sqlerrm;

end;

$BODY$
  language plpgsql volatile
  cost 100;
alter function sp_proveedor_delete(integer)
  owner to postgres;