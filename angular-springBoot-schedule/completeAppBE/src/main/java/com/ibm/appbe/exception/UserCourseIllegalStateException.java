package com.ibm.appbe.exception;

public class UserCourseIllegalStateException extends IllegalStateException {
    private static final long serialVersionUID = 1L;
    public UserCourseIllegalStateException(String message) { super(message); }
    public UserCourseIllegalStateException(Throwable e) { super(e); }
}
