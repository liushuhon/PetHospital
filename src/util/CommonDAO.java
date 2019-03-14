package util;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ParameterMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Map;

public class CommonDAO {

	private static final String url = "jdbc:mysql://localhost:3306/pethospital?Unicode=true&characterEncoding=UTF-8";

	private static final String username = "root";

	private static final String password = "123";

	private static final String jdbcDriver = "com.mysql.jdbc.Driver";
	protected boolean pmdKnownBroken = false;

	public CommonDAO() {

	}

	public CommonDAO(boolean pmdKnownBroken) {
		this.pmdKnownBroken = pmdKnownBroken;
	}

	public Connection getConnetion() {

		Connection conn = null;
		try {
			Class.forName(jdbcDriver);
			conn = DriverManager.getConnection(url, username, password);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return conn;
	}


	
	public List<Map<String, Object>> excuteQuery(String sql, Object[] o) {
		return (List<Map<String, Object>>) excuteQuery(sql, o,
				new ListMapHander());

	}

	public Object excuteQuery(String sql, Object[] o, ResultSetHandler rsh) {

		PreparedStatement pstmt = null;

		Connection con = null;

		ResultSet rs = null;
		try {
			con = this.getConnetion();

			pstmt = con.prepareStatement(sql);

			fillStatement(pstmt, o);

			rs = pstmt.executeQuery();

			return rsh.doHander(rs);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			close(con, pstmt, rs);
		}

		return null;

	}

	public int executeUpdate(String sql, Object[] o) {

		PreparedStatement pstmt = null;

		Connection con = null;

		try {

			con = this.getConnetion();

			con.setAutoCommit(false);

			pstmt = con.prepareStatement(sql,PreparedStatement.RETURN_GENERATED_KEYS);

			fillStatement(pstmt, o);

			int result = -1;
			pstmt.executeUpdate();
			
			con.commit();

			con.setAutoCommit(true);
			ResultSet rs = pstmt.getGeneratedKeys();
			if(rs.next()){
				result = rs.getInt(1);
			}
			return result;

		} catch (Exception e) {
			try {
				con.rollback();

				if (!con.getAutoCommit()) {
					con.setAutoCommit(true);
				}

			} catch (SQLException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} finally {

			close(con, pstmt, null);
		}
		return -1;
	}

	private void close(Connection con, PreparedStatement pstmt, ResultSet rs) {
		if (rs != null) {
			try {
					rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		if (pstmt != null) {
			try {
					pstmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		try {
			if (con != null && !con.isClosed()) {
				try {
					con.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private void fillStatement(PreparedStatement pstmt, Object[] o) {

		if (o == null) {
			return;
		}

		try {
			ParameterMetaData pmd = pstmt.getParameterMetaData();

			int count = pmd.getParameterCount();

			int size = o.length;

			if (count != size) {
				return;
			}

			for (int i = 0; i < count; i++) {
				if (o[i] != null) {
					pstmt.setObject(i + 1, o[i]);
				} else {
					int sqlType = Types.VARCHAR;
					sqlType = pmd.getParameterType(i + 1);
					pstmt.setNull(i + 1, sqlType);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public int executeUpdateByte(String sql, byte[] b) {

		PreparedStatement pstmt = null;

		Connection con = null;

		try {

			con = this.getConnetion();

			con.setAutoCommit(false);

			pstmt = con.prepareStatement(sql);
			System.out.println(sql + " b:" + b.length);
			pstmt.setBytes(1, b);

			int result = pstmt.executeUpdate();

			con.commit();

			con.setAutoCommit(true);

			return result;

		} catch (Exception e) {
			try {
				con.rollback();

				if (!con.getAutoCommit()) {
					con.setAutoCommit(true);
				}

			} catch (SQLException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} finally {

			close(con, pstmt, null);
		}
		return -1;
	}

}
