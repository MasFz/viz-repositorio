<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { computePosition, autoPlacement, offset } from "@floating-ui/dom";
    import Bar from "$lib/Bar.svelte";
    import { base } from "$app/paths";
  
    let data = [], commits = [];
    let hoveredIndex = -1, tooltipPosition = { x: 0, y: 0 }, commitTooltip;
    $: hoveredCommit = commits[hoveredIndex] ?? hoveredCommit ?? {};
    let clickedCommits = [];
    let width = 1000, height = 600, margin = { top: 10, right: 10, bottom: 30, left: 20 };
    let usableArea = { top: margin.top, left: margin.left, right: width - margin.right, bottom: height - margin.bottom };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;
    let xAxis, yAxis, yAxisGridlines;
  
    onMount(async () => {
      try {
        data = await d3.csv(`${base}/loc.csv`, row => ({
          ...row,
          line: +row.line,
          depth: +row.depth,
          length: +row.length,
          date: new Date(row.date + "T00:00" + row.timezone),
          datetime: new Date(row.datetime)
        }));
        console.log("Dados carregados:", data);
        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
          const { author, date, time, timezone, datetime } = lines[0];
          const ret = {
            id: commit,
            url: "https://github.com/USERNAME/REPO/commit/" + commit,
            author, date, time, timezone, datetime,
            hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
            totalLines: lines.length
          };
          Object.defineProperty(ret, "lines", { value: lines, configurable: true, writable: true, enumerable: false });
          return ret;
        });
        commits = d3.sort(commits, d => -d.totalLines);
        console.log("Commits:", commits);
      } catch (e) {
        console.error("Erro ao carregar o CSV:", e);
      }
    });
  
    $: minDate = d3.min(commits, d => d.date);
    $: maxDate = d3.max(commits, d => d.date);
    $: maxDatePlusOne = maxDate && new Date(new Date(maxDate).setDate(new Date(maxDate).getDate() + 1));
  
    $: xScale = d3.scaleTime().domain([minDate, maxDatePlusOne]).range([usableArea.left, usableArea.right]).nice();
    $: yScale = d3.scaleLinear().domain([24, 0]).range([usableArea.bottom, usableArea.top]);
    $: rScale = d3.scaleSqrt().domain(d3.extent(commits, d => d.totalLines)).range([2, 30]);
  
    $: {
      if (xAxis && yAxis) {
        d3.select(xAxis).call(d3.axisBottom(xScale));
        d3.select(yAxis).call(d3.axisLeft(yScale).tickFormat(d => `${String(d % 24).padStart(2, "0")}:00`));
      }
    }
  
    $: {
      if (yAxisGridlines) {
        d3.select(yAxisGridlines).call(d3.axisLeft(yScale).tickFormat("").tickSize(-usableArea.width));
      }
    }
  
    async function dotInteraction(index, evt) {
      if (evt.type === "mouseenter") {
        hoveredIndex = index;
        tooltipPosition = await computePosition(evt.target, commitTooltip, {
          strategy: "fixed",
          middleware: [offset(5), autoPlacement()]
        });
      } else if (evt.type === "mouseleave") {
        hoveredIndex = -1;
      } else if (evt.type === "click") {
        const commit = commits[index];
        clickedCommits = clickedCommits.includes(commit)
          ? clickedCommits.filter(c => c !== commit)
          : [...clickedCommits, commit];
      }
    }
  
    $: allTypes = Array.from(new Set(data.map(d => d.type)));
    $: selectedLines = (clickedCommits.length > 0 ? clickedCommits : commits).flatMap(d => d.lines);
    $: selectedCounts = d3.rollup(selectedLines, v => v.length, d => d.type);
    $: languageBreakdown = allTypes.map(type => [type, selectedCounts.get(type) || 0]);
  </script>
  
  <section>
    <h3>Commits by time of day</h3>
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g class="gridlines" transform={`translate(${usableArea.left}, 0)`} bind:this={yAxisGridlines}></g>
      <g transform={`translate(${usableArea.left}, 0)`} bind:this={yAxis}></g>
      <g transform={`translate(0, ${usableArea.bottom})`} bind:this={xAxis}></g>
      <g class="dots">
        {#each commits as commit, index}
          <circle
            on:mouseenter={evt => dotInteraction(index, evt)}
            on:mouseleave={evt => dotInteraction(index, evt)}
            on:click={evt => dotInteraction(index, evt)}
            cx={xScale(commit.datetime)}
            cy={yScale(commit.hourFrac)}
            r={rScale(commit.totalLines)}
            fill="steelblue"
            fill-opacity="0.5"
            class:selected={clickedCommits.includes(commit)}
          ></circle>
        {/each}
      </g>
    </svg>
    <dl class="info tooltip" bind:this={commitTooltip} hidden={hoveredIndex === -1} style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px">
      <dt>Commit</dt>
      <dd><a href={hoveredCommit.url} target="_blank">{hoveredCommit.id}</a></dd>
      <dt>Date</dt>
      <dd>{hoveredCommit.datetime ? hoveredCommit.datetime.toLocaleString("en", { dateStyle: "full" }) : ""}</dd>
      <dt>Author</dt>
      <dd>{hoveredCommit.author}</dd>
      <dt>Time</dt>
      <dd>{hoveredCommit.time}</dd>
    </dl>
    <Bar data={languageBreakdown} width={width} />
  </section>
  
  <style>
    svg { overflow: visible; }
    .gridlines { stroke-opacity: 0.2; }
    circle { transition: 200ms; transform-origin: center; transform-box: fill-box; }
    circle:hover { transform: scale(1.5); }
    .selected { fill: var(--color-accent); }
    .info {
      display: grid;
      margin: 0;
      grid-template-columns: auto auto;
      background-color: oklch(100% 0% 0 / 80%);
      box-shadow: 1px 1px 3px 3px gray;
      border-radius: 5px;
      backdrop-filter: blur(10px);
      padding: 10px;
      transition-duration: 500ms;
      transition-property: opacity, visibility;
    }
    .info dt { grid-column: 1; }
    .info dd { grid-column: 2; font-weight: 400; }
    .info[hidden]:not(:hover, :focus-within) { opacity: 0; visibility: hidden; }
    .tooltip { position: fixed; z-index: 10; }
  </style>
  