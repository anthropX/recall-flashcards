let cards
let buckets

// Higher the card weight, higher the changes of a card being shown
const hfCardWeight = 8 // hf - high frequency
const mfCardWeight = 4 // mf - medium frequency
const lfCardWeight = 2 // lf - low frequency
const masteredCardWeight = 1

let hfBucketWeight
let mfBucketWeight
let lfBucketWeight
let masteredBucketWeight

const minHfBucketSize = 5

export default function getCard(deck) {
  cards = deck.cards
  buckets = deck.buckets
  hfBucketWeight = hfCardWeight * buckets.highFreq.length
  mfBucketWeight = mfCardWeight * buckets.mdFreq.length
  lfBucketWeight = lfCardWeight * buckets.lowFreq.length
  masteredBucketWeight = masteredCardWeight * buckets.mastered.length
  if (buckets.highFreq.length < minHfBucketSize && buckets.new.length > 0)
    return getCardFromNew()
  return getCardFromLearning(getRand(getMaxRand()))
}

function getCardFromLearning(rand) {
  let cardIndex
  let badge
  if (rand - hfBucketWeight < 0) {
    // high freq bucket
    cardIndex = buckets.highFreq[Math.floor(rand / hfCardWeight)]
    badge = { bucket: 'Learning', variant: 'danger' }
  } else if (rand - hfBucketWeight - mfBucketWeight < 0) {
    // md freq bucket
    cardIndex =
      buckets.mdFreq[Math.floor((rand - hfBucketWeight) / mfCardWeight)]
    badge = { bucket: 'Reinforcing', variant: 'threat' }
  } else if (rand - hfBucketWeight - mfBucketWeight - lfBucketWeight < 0) {
    // low freq bucket
    cardIndex =
      buckets.lowFreq[
        Math.floor((rand - hfBucketWeight - mfBucketWeight) / lfCardWeight)
      ]
    badge = { bucket: 'Mastering', variant: 'threat' }
  } else {
    // mastered bucket
    cardIndex =
      buckets.mastered[
        Math.floor(
          (rand - hfBucketWeight - mfBucketWeight - lfBucketWeight) /
            masteredCardWeight,
        )
      ]
    badge = { bucket: 'Mastered', variant: 'success' }
  }
  return { ...cards[cardIndex], badge }
}

function getCardFromNew() {
  const cardIndex = buckets.new[Math.floor(Math.random() * buckets.new.length)]
  const badge = { bucket: 'New', variant: 'secondary' }
  return { ...cards[cardIndex], badge }
}

function getMaxRand() {
  return (
    hfBucketWeight + mfBucketWeight + lfBucketWeight + masteredBucketWeight - 1
  )
}

function getRand(maxRand) {
  return Math.floor(Math.random() * (maxRand + 1))
}
