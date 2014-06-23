package models.cairo.trees

import java.sql.{Connection, CallableStatement, ResultSet, Types, SQLException}
import play.api.Logger
import services.db.DB
import play.api.Play.current
import models.domain.CompanyUser

import scala.util.control.NonFatal

case class Tree(id: Int, name: String, root: Int)

object Tree {

  def loadForTable(user: CompanyUser, tableId: Int): List[Tree] = {
    val sql = "{call sp_arbgetarboles(?, ?)}"
    val connection = DB.getConnection(user.database.database, false)
    val cs = connection.prepareCall(sql)

    cs.setInt(1, tableId)
    cs.registerOutParameter(2, Types.OTHER)

    cs.execute()

    val rs = cs.getObject(2).asInstanceOf [java.sql.ResultSet]
    def fillList(): List[Tree] = {
      if (rs.next()) {
        Tree(rs.getInt("arb_id"), rs.getString("arb_nombre"), rs.getInt("ram_id")) :: fillList()
      }
      else {
        rs.close
        cs.close
        connection.commit
        connection.close
        List()
      }
    }
    fillList()
  }

  def save(user: CompanyUser, tableId: Int, name: String): Tree = {
    val sql = "{call sp_arb_arbol_create(?, ?, ?, ?)}"
    val connection = DB.getConnection(user.database.database, false)
    val cs = connection.prepareCall(sql)

    cs.setInt(1, user.user.id.getOrElse(0))
    cs.setInt(2, tableId)
    cs.setString(3, name)
    cs.registerOutParameter(4, Types.OTHER)

    try {
      cs.execute()

      val rs = cs.getObject(4).asInstanceOf[java.sql.ResultSet]

      try {
        if (rs.next) Tree(rs.getInt("arb_id"), rs.getString("arb_nombre"), rs.getInt("ram_id"))
        else Tree(0, "", 0)
      }
      finally {
        rs.close
      }

    } catch {
      case NonFatal(e) => {
        Logger.error(s"can't save a tree. Tree name: ${name}. Error ${e.toString}")
        throw e
      }
    } finally {
      cs.close
      connection.commit
      connection.close
    }
  }

}