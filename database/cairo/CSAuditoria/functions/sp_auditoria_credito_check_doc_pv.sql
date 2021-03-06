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
-- Function: sp_auditoria_credito_check_doc_pv()

-- drop function sp_auditoria_credito_check_doc_pv(integer);

create or replace function sp_auditoria_credito_check_doc_pv
(
  in p_pv_id integer,
  out p_success integer,
  out p_error_msg varchar
)
  returns record as
$BODY$
begin

   select * from sp_auditoria_credito_check_doc_pv_cliente(p_pv_id) into p_success, p_error_msg;

end;
$BODY$
  language plpgsql volatile
  cost 100;
alter function sp_auditoria_credito_check_doc_pv(integer)
  owner to postgres;