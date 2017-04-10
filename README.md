# go-vnstat

Web-based network usage reporting.

## Requirements

Operating System: Linux

- vnstat (each network interfaces must have their databases created by vnstat)
- go
- glide

Default port: 8000


### Dependency Installation

```bash
$ glide install
```

### Building

```bash
$ go build -o govnstat
```

To run the build.
```bash
$ ./govnstat
```
Then open your browser, and go to: [http://localhost:8000](http://localhost:8000)

# To-do
- [ ] Makefile
- [ ] Use random unused port