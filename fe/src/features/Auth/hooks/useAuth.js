import { useContext, useEffect, useCallback } from "react";
import { register, login, getMe, logout } from "../services/auth.service";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handelRegister = async ({ userName, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ userName, email, password });
      const nextUser = data?.user ?? null;
      setUser(nextUser);
      return nextUser !== null;
    } catch (error) {
      console.error(error);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handelLogin = async ({ userName, email, password }) => {
    setLoading(true);
    try {
      const data = await login({ userName, email, password });
      const nextUser = data?.user ?? null;
      setUser(nextUser);
      return nextUser !== null;
    } catch (error) {
      console.error(error);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handelLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handelGetMe = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data?.user ?? null);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading]);

  useEffect(() => {
    handelGetMe();
  }, [handelGetMe]);

  return { user, loading, handelRegister, handelLogin, handelLogout, handelGetMe };
};
