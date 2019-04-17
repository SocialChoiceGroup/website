import React, { Component } from "react";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardMedia
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: "10px"
  },
  header: {
    marginTop: "25px",
    marginBoton: "40px",
    padding: "25px",
    textAlign: "center"
  },
  grid: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "30px",
      paddingLeft: "30px"
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px"
    }
  },

  card: {
    maxWidth: 325
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover",
    height: 300
  }
});

// const possibleIds = [
//   20,
//   24,
//   25,
//   26,
//   27,
//   28,
//   34,
//   35,
//   37,
//   38,
//   40,
//   43,
//   44,
//   45,
//   48,
//   51,
//   52,
//   54,
//   56,
//   57,
//   65,
//   68,
//   69,
//   70,
//   72,
//   74
// ];

const rankedPairOrder = [
  "57",
  "20",
  "65",
  "40",
  "37",
  "70",
  "35",
  "43",
  "45",
  "28",
  "34",
  "25",
  "52",
  "54",
  "27",
  "24",
  "51",
  "44",
  "48",
  "56",
  "74",
  "38",
  "72",
  "26",
  "68",
  "69"
];

const eloRankingOrder = [
  [20, 1415],
  [57, 1362],
  [70, 1344],
  [35, 1336],
  [65, 1299],
  [43, 1286],
  [40, 1276],
  [45, 1271],
  [37, 1229],
  [34, 1221],
  [25, 1210],
  [52, 1205],
  [51, 1192],
  [54, 1191],
  [24, 1185],
  [28, 1160],
  [44, 1154],
  [27, 1138],
  [38, 1128],
  [56, 1124],
  [26, 1104],
  [48, 1098],
  [72, 1093],
  [74, 1066],
  [68, 1058],
  [69, 1056]
];

const winRatioOrder = [
  [57, 0.69],
  [20, 0.68],
  [65, 0.63],
  [40, 0.62],
  [70, 0.59],
  [35, 0.55],
  [37, 0.54],
  [43, 0.54],
  [45, 0.52],
  [34, 0.48],
  [25, 0.47],
  [52, 0.47],
  [28, 0.44],
  [54, 0.43],
  [24, 0.41],
  [51, 0.41],
  [27, 0.4],
  [44, 0.38],
  [48, 0.34],
  [56, 0.34],
  [74, 0.32],
  [26, 0.3],
  [38, 0.3],
  [72, 0.3],
  [68, 0.23],
  [69, 0.22]
];

const copelandsRanking = [
  [57, 25],
  [20, 23],
  [65, 21],
  [40, 17],
  [70, 17],
  [35, 15],
  [37, 13],
  [43, 13],
  [45, 9],
  [28, 7],
  [34, 5],
  [52, 3],
  [25, -1],
  [27, -1],
  [54, -1],
  [24, -5],
  [51, -7],
  [44, -9],
  [48, -11],
  [74, -13],
  [26, -17],
  [56, -17],
  [38, -19],
  [72, -19],
  [68, -23],
  [69, -25]
];

const miniMaxRanking = [
[20, 0.757],
[57, 0.755],
[40, 0.713],
[65, 0.709],
[70, 0.661],
[37, 0.655],
[35, 0.641],
[43, 0.639],
[45, 0.612],
[34, 0.584],
[52, 0.581],
[25, 0.573],
[28, 0.567],
[54, 0.554],
[27, 0.534],
[24, 0.526],
[51, 0.513],
[44, 0.500],
[48, 0.494],
[74, 0.460],
[72, 0.453],
[56, 0.451],
[38, 0.450],
[26, 0.443],
[68, 0.393],
[69, 0.383]
];

class Rankings extends Component {
  state = {
    rankedPairs: false,
    eloRanking: false,
    winRatio: false,
    copelandsRanking: false,
    miniMaxRanking: false,
    method: null
  };

  getVoteData() {
    const that = this;
    fetch("https://us-east1-dog-project-234515.cloudfunctions.net/get_votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.dogId
      })
    }).then(function(response) {
      response.json().then(function(data) {
        that.setState({ voteData: data });
      });
    });
  }

  handleChange = event => {
    event.persist();
    console.log(event.target.value);
    this.setState({ method: event.target.value }, () => {
      if (this.state.method === "rp") {
        this.setState({ rankedPairs: true });
        this.setState({ eloRanking: false });
        this.setState({ winRatio: false });
        this.setState({ copelandsRanking: false });
        this.setState({ miniMaxRanking: false });
      } else if (this.state.method === "elo") {
        this.setState({ eloRanking: true });
        this.setState({ rankedPairs: false });
        this.setState({ winRatio: false });
        this.setState({ copelandsRanking: false });
        this.setState({ miniMaxRanking: false });
      } else if (this.state.method === "wr") {
        this.setState({ winRatio: true });
        this.setState({ eloRanking: false });
        this.setState({ rankedPairs: false });
        this.setState({ copelandsRanking: false });
        this.setState({ miniMaxRanking: false });
      }  else if (this.state.method === "cop") {
        this.setState({ winRatio: false });
        this.setState({ eloRanking: false });
        this.setState({ rankedPairs: false });
        this.setState({ copelandsRanking: true });
        this.setState({ miniMaxRanking: false });
      } else if (this.state.method === "mini") {
        this.setState({ winRatio: false });
        this.setState({ eloRanking: false });
        this.setState({ rankedPairs: false });
        this.setState({ copelandsRanking: false });
        this.setState({ miniMaxRanking: true });
      } else {
        this.setState({ eloRanking: false });
        this.setState({ rankedPairs: false });
        this.setState({ winRatio: false });
        this.setState({ copelandsRanking: false });
        this.setState({ miniMaxRanking: false });
      }
    });
  };

  render() {
    const { classes } = this.props;
    var place = 0;

    return (
      <div className={classes.root}>
        <Paper className={classes.header}>
          <Typography variant="h2">Rankings</Typography>
        </Paper>
        <Paper className={classes.header}>
          <Typography variant="h4">
            Select a Ranking Method:
            <select onChange={this.handleChange}>
              <option value="">Select an option</option>
              <option value="rp">Ranked Pairs</option>
              <option value="elo">Elo Ranking</option>
              <option value="cop">Copeland's Ranking</option>
              <option value="mini">MiniMax Ranking</option>
              <option value="wr">Win Ratio</option>
            </select>
          </Typography>
        </Paper>
        {this.state.rankedPairs ? (
          <div>
            <h1 className={classes.header}>Ranked Pairs</h1>
            <p>
              The{" "}
              <a
                href="https://en.wikipedia.org/wiki/Ranked_pairs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ranked Pair
              </a>{" "}
              method finds a winner who is preferred over all the other dogs if
              that dog exists. If that dog does not exist, then all the
              intransitive relationships are removed in order of the strength of
              the relationship. It’s computed as follows:
              <ol>
                <li>
                  Sort each pair of dogs by the the largest win ratio (win -
                  loss) / total.
                </li>
                <li>
                  Go through all the dog pairs. If the relationship is
                  transitive with the other relationships already considered
                  (ϱ), consider the relationship in the ranking. If it is not
                  transitive, ignore the preferences expressed for the pair.
                </li>
                <li>
                  Find the dog that did not lose in any relationships considered,
                  and add that dog to the next available spot in the ranking.
                  Remove that dog from ϱ.
                </li>
                <li>
                  Repeat steps 2-3 until there are no more dogs left in ϱ.
                </li>
              </ol>{" "}
            </p>
            <Grid container spacing={24} className={classes.grid}>
              {rankedPairOrder.map(id => {
                place += 1;
                return (
                  <Grid item s={6} md={3}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Team Member"
                          className={classes.media}
                          src={"/images/dogs/" + id + ".png"}
                          title="Team Member"
                        />
                      </CardActionArea>
                      <CardActionArea style={{ textAlign: "center"}}>
                        <Typography variant="h4">{place}</Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : null}
        {this.state.eloRanking ? (
          <div>
            <h1 className={classes.header}>Elo Ranking</h1>
            <p>
              The{" "}
              <a
                href="https://en.wikipedia.org/wiki/Elo_rating_system)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Elo
              </a>{" "}
              rating system is most well known for its usage in chess rankings.
              The difference in the Elo scores assigned to a higher ranked
              player (Alice) and a lower ranked player (Bob) corresponds to the
              likelihood that the Alice wins in a match between her and Bob. If
              Alice has a score 400 points higher than Bob, then Alice has a 10
              to 1 chance of winning a match. If Alice wins the match, her score
              will increase a little and Bob’s will decrease a little since the
              result is expected. Conversely, if Bob wins the match, his score
              will increase a lot and Alice’s will decrease a lot. Applied to
              our dogs, the `chess match` is one comparison between two dogs.
              The difference in ranks between two dogs in a comparison
              corresponds to the likelihood higher ranked dog is chosen for as
              cuter in a given vote. The more votes we get, the more accurate
              the dogs Elo scores become.
            </p>
            <Grid container spacing={24} className={classes.grid}>
              {eloRankingOrder.map(pair => {
                place += 1;
                return (
                  <Grid item s={6} md={3}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Team Member"
                          className={classes.media}
                          src={"/images/dogs/" + pair[0] + ".png"}
                          title="Team Member"
                        />
                      </CardActionArea>
                      <CardActionArea style={{ textAlign: "center"}}>
                        <Typography variant="h4">{place}</Typography>
                        <Typography
                          variant="p"
                          style={{ marginBottom: "10px" }}
                        >
                          Elo Score: {pair[1]}
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : null}
        {this.state.copelandsRanking ? (
          <div>
            <h1 className={classes.header}>Copeland's Ranking</h1>
            <p>
              The{" "}
              <a
                href="https://en.wikipedia.org/wiki/Copeland%27s_method"
                target="_blank"
                rel="noopener noreferrer"
              >
                Copeland's Ranking
              </a>{" "} method...
            </p>
            <Grid container spacing={24} className={classes.grid}>
              {copelandsRanking.map(pair => {
                place += 1;
                return (
                  <Grid item s={6} md={3}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Team Member"
                          className={classes.media}
                          src={"/images/dogs/" + pair[0] + ".png"}
                          title="Team Member"
                        />
                      </CardActionArea>
                      <CardActionArea style={{ textAlign: "center"}}>
                        <Typography variant="h4">{place}</Typography>
                        <Typography
                          variant="p"
                          style={{ marginBottom: "10px" }}
                        >
                          Score: {pair[1]}
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : null}
        {this.state.miniMaxRanking ? (
          <div>
            <h1 className={classes.header}>MiniMax Ranking</h1>
            <p>
              The MiniMax rating system...
            </p>
            <Grid container spacing={24} className={classes.grid}>
              {miniMaxRanking.map(pair => {
                place += 1;
                return (
                  <Grid item s={6} md={3}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Team Member"
                          className={classes.media}
                          src={"/images/dogs/" + pair[0] + ".png"}
                          title="Team Member"
                        />
                      </CardActionArea>
                      <CardActionArea style={{ textAlign: "center"}}>
                        <Typography variant="h4">{place}</Typography>
                        <Typography
                          variant="p"
                          style={{ marginBottom: "10px" }}
                        >
                          Win/Tie Percentage: {(pair[1]*100).toFixed(1)}%
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : null}
        {this.state.winRatio ? (
          <div>
            <h1 className={classes.header}>Win Ratio</h1>
            <p className={classes.header}>
              This is is a simple calculation of (wins - losses)/total.
            </p>
            <Grid container spacing={24} className={classes.grid}>
              {winRatioOrder.map(pair => {
                place += 1;
                return (
                  <Grid item s={6} md={3}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Team Member"
                          className={classes.media}
                          src={"/images/dogs/" + pair[0] + ".png"}
                          title="Team Member"
                        />
                      </CardActionArea>
                      <CardActionArea style={{ textAlign: "center"}}>
                        <Typography variant="h4">{place}</Typography>
                        <Typography
                          variant="p"
                          style={{ marginBottom: "10px" }}
                        >
                          Win Ratio: {pair[1]}
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : null}
      </div>
    );
  }
}

Rankings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Rankings);
