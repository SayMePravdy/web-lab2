package app.servlets;

import app.entity.Hit;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class AreaCheckServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long startTime = System.nanoTime();
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            Hit hit = getHit(request, startTime);
            List<Hit> hits = (List<Hit>) request.getSession().getAttribute("hits");
            if (hits == null) {
                hits = Stream.of(hit).collect(Collectors.toList());
            } else {
                hits.add(hit);
            }
            request.getSession().setAttribute("hits", hits);
            out.println(hit.toJson());
        } catch (NumberFormatException e) {
            e.printStackTrace();
            out.println("Incorrect coordinates type");
        } finally {
            out.close();
        }
    }

    private Hit getHit(HttpServletRequest request, long startTime) throws NumberFormatException {
        double x = Double.parseDouble(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));

        String currentTime = new SimpleDateFormat("HH:mm:ss").format(new Date());
        boolean checkHit = checkHit(x, y, r);
        return new Hit(x, y, r, currentTime, checkHit ? "Да" : "Нет",
                (System.nanoTime() - startTime) / 1000000000d);
    }

    private boolean checkHit(double x, double y, double r) {
        if (x >= 0 && y >= 0 && y <= r && x <= r / 2) {
            return true;
        }
        if (x <= 0 && y >= 0 && (x * x + y * y <= (r * r))) {
            return true;
        }
        return x >= 0 && y <= 0 && y >= (2 * x - r);
    }
}
