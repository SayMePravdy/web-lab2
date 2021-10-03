package app.entity;

import java.util.List;

public class HitsBean {

    private final List<Hit> hits;

    public List<Hit> getHits() {
        return hits;
    }

    public HitsBean(List<Hit> hits) {
        this.hits = hits;
    }

    public void add(Hit hit) {
        hits.add(hit);
    }
}
