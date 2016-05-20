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
-- Function: sp_doc_orden_pago_get_cuenta_deudor()

-- drop function sp_doc_orden_pago_get_cuenta_deudor(varchar);

/*
select * from sp_doc_orden_pago_get_cuenta_deudor('22,23,24,25,26,27,28');
fetch all from rtn;
*/

create or replace function sp_doc_orden_pago_get_cuenta_deudor
(
  in p_strIds varchar,
  out rtn refcursor
)
  returns refcursor as
$BODY$
declare
   v_cue_acreedoresXcpra integer := 8;
   v_timeCode timestamp with time zone;
begin

   v_timeCode := CURRENT_TIMESTAMP;

   perform sp_str_string_to_table(v_timeCode, p_strIds, ',');

   rtn := 'rtn';

   open rtn for
      select fc_id,
             c.cue_id,
             c.cue_nombre
      from AsientoItem
      join FacturaCompra
        on AsientoItem.as_id = FacturaCompra.as_id
      join TmpStringToTable
        on FacturaCompra.fc_id = cast(TmpStringToTable.tmpstr2tbl_campo as integer)
      join Cuenta c
        on AsientoItem.cue_id = c.cue_id
      where asi_haber <> 0
        and tmpstr2tbl_id = v_timeCode
        and c.cuec_id = v_cue_acreedoresXcpra
      group by fc_id,c.cue_id,c.cue_nombre;

end;
$BODY$
  language plpgsql volatile
  cost 100;
alter function sp_doc_orden_pago_get_cuenta_deudor(varchar)
  owner to postgres;