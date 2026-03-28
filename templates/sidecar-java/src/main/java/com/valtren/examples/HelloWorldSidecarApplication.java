package com.valtren.examples;

import java.util.Map;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class HelloWorldSidecarApplication {
  public static void main(String[] args) {
    SpringApplication.run(HelloWorldSidecarApplication.class, args);
  }

  @GetMapping("/health")
  public Map<String, Object> health() {
    return Map.of("ok", true, "service", "__NAME__");
  }

  @PostMapping("/analyze")
  public Map<String, Object> analyze(@RequestBody(required = false) Map<String, Object> payload) {
    return Map.of(
      "ok", true,
      "service", "__NAME__",
      "message", "Replace this placeholder with your Java sidecar logic.",
      "input", payload == null ? Map.of() : payload
    );
  }

  @PostMapping("/hooks/{hookName}")
  public Map<String, Object> hook(@PathVariable String hookName, @RequestBody(required = false) Map<String, Object> payload) {
    return Map.of(
      "ok", true,
      "hook", hookName,
      "service", "__NAME__",
      "received", payload == null ? Map.of() : payload
    );
  }
}
