package app.entity;


public class Hit {

    private final double x;
    private final double y;
    private final double r;
    private final String localDateTime;
    private final String checkHit;
    private final double execTime;

    public Hit(double x, double y, double r, String localDateTime, String checkHit, double execTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.localDateTime = localDateTime;
        this.checkHit = checkHit;
        this.execTime = execTime;
    }

    public String getLocalDateTime() {
        return localDateTime;
    }

    public String getCheckHit() {
        return checkHit;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public double getExecTime() {
        return execTime;
    }

    public String toJson() {
        return "{" +
                "\"x\":" + x + ',' +
                "\"y\":" + y + ',' +
                "\"r\":" + r + ',' +
                "\"time\":" + "\"" + localDateTime + "\"" + ',' +
                "\"exec_time\":" + execTime + ',' +
                "\"check\":" + "\"" + checkHit + "\"" +
                "}";
    }
}
