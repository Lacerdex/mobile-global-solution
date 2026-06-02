    package com.fiap.mobile.global_solution.controller;

    import java.util.List;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.CrossOrigin;
    import org.springframework.web.bind.annotation.DeleteMapping;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;

    import com.fiap.mobile.global_solution.model.Alerta;
    import com.fiap.mobile.global_solution.model.enums.AlertaGravidade;
    import com.fiap.mobile.global_solution.service.AlertaService;

    @RestController
    @RequestMapping("/api/alertas")
    @CrossOrigin(origins = "*") // Permite que o app mobile acesse sem erros de CORS
    public class AlertaController {

        @Autowired
        private AlertaService alertaService;

        @PostMapping
        public ResponseEntity<Alerta> criarAlerta(@RequestBody Alerta alerta) {
            Alerta novoAlerta = alertaService.salvarAlerta(alerta);
            return new ResponseEntity<>(novoAlerta, HttpStatus.CREATED);
        }

        @GetMapping
        public ResponseEntity<List<Alerta>> listarAlertas() {
            return ResponseEntity.ok(alertaService.listarTodos());
        }

        @GetMapping("/filtro")
        public ResponseEntity<List<Alerta>> filtrarPorGravidade(@RequestParam AlertaGravidade gravidade) {
            return ResponseEntity.ok(alertaService.listarPorGravidade(gravidade));
        }

        @GetMapping("/{id}")
        public ResponseEntity<Alerta> buscarPorId(@PathVariable Long id) {
            Alerta alerta = alertaService.buscarPorId(id);
            if (alerta == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(alerta);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deletarAlerta(@PathVariable Long id) {
            Alerta alerta = alertaService.buscarPorId(id);
            if (alerta == null) {
                return ResponseEntity.notFound().build();
            }
            alertaService.deletarAlerta(id);
            return ResponseEntity.noContent().build();
        }
    }