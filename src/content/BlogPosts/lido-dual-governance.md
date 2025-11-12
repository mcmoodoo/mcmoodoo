---
title: "Lido Dual Governance – Empowering stETH Holders and Balancing DAO Power"
date: "2024-11-12"
tags: ["Lido", "Dual Governance", "stETH", "LDO", "DAO", "Blockchain", "Ethereum", "DeFi", "Governance", "Veto Power"]
excerpt: "Discover how Lido Dual Governance protects stETH holders by enabling veto power, dynamic time locks, and exit guarantees, ensuring fairer DAO decision-making and user security."
---

Lido Dual Governance seeks to empower users to influence DAO decisions without direct involvement in governance. The users are, instead, allowed to veto unwanted protocol changes proposed by LDO token holders.

By vetoing a proposed change, stETH holders initiate a dynamic time lock that leads to two potential outcomes. Firstly, it allows stETH holders to exit if the DAO proceeds with the proposed change. Alternatively, it offers sufficient time to reverse and undo the proposed changes if token holders determine that retaining users in the protocol is more important.

Another way to look at Dual Governance is that it implements:

- A dynamic user-extensible time lock on DAO decisions  
- A rage-quit mechanism for stakers, accounting for the specifics of the Ethereum withdrawal process

## Why

The DAO's overwhelming power over the protocol can lead to controversial changes to the social contract between users and LDO holders. That includes code changes, altering the list of Oracle committee members, stake distribution changes, and governance structure alterations.

Dual Governance will dramatically shift the balance of power toward users, putting them ahead of LDO token holders. It will do so without burdening users with additional governance duties and voting responsibilities. But instead giving users exit guarantees and allowing them to negotiate from a position of strength.

DG aims to protect users from the negative effects of the DAO's one-sided governance, allowing the stETH holders to impact DAO decisions and indirectly defend their interests.

## Putting Users First

The current governance of the Lido protocol leaves stETH holders underrepresented in this principal-agent relationship between users and DAO. With the protocol holding nearly eight times the value of the DAO, it makes LDO ownership an attractive way to sabotage stETH holders. In the worst-case scenario, attackers could seize majority control of the LDO token through ownership, borrowing, or bribing. This poses a huge threat to stETH holders.

To address this unbalanced relationship, there is a need for a system of "checks and balances," resembling the governance principle where separate branches are authorized to prevent actions by others and encouraged to distribute power.

Disincentivizing majority stake ownership in LDO will thwart cartel activities and bring more uniformity to the poor LDO token distribution. Owning LDO to rug stETH holders will no longer be relevant because the targeted users will most likely just flee with their funds intact at the first sign of danger and long before the proposal takes effect.

## Two-phased Veto

A two-phased veto allows for a small group of users to voice their disagreement with the DAO's current course. They do so by sounding an alarm that pauses Lido governance and invites other frustrated users to join the veto, strengthening their collective intention to leave. This causes the dynamic time lock to extend as necessary and provide enough time for both parties to negotiate.

Users will be able to impact DAO's decisions by mere willingness and determination to rage quit. The rage quit mechanism is the last line of defense for stakers after all the negotiations have failed. In an attempt to retain users, the DAO might simply decide to withdraw the proposal, prioritizing users above the desired protocol changes. This gives users more say in the governance.

If, however, users fail to persuade the DAO to back off, they can resort to exiting the protocol. After they exit, the DAO resumes its governance and can execute the controversial proposal.

## Foot Voting

Dual Governance will also safeguard the stakers' ability to foot vote at times of mass exits. Foot voting stands out as one of the most efficient voting mechanisms because it requires no coordination among participants. However, it only works well in moderate misalignments between stETH holders and LDO holders, particularly during gradual user outflows.

In any other extreme cases, including governance attacks or removing the majority of operators, this mechanism proves useless: a huge outflow of stETH refugees will cause big line-ups in Ethereum's throughput-limited withdrawal queue and users won't be able to leave in the time allotted. Moreover, users who have locked their stETH elsewhere for higher yields face prolonged unwinding times. Under a single veto phase, these users would have been stuck!

All in all, Dual Governance will allow stakers to exit the protocol without being subject to new and pending DAO decisions, further improving foot-voting efficiency.

## Dynamic Time Lock

DG will extend the current rigid execution time lock with a dynamic user-induced time lock that will provide sufficient time for stakers to exit. The time lock could be triggered by a minority of stakers and prolonged by the rest.

A quorum of users could sound an alarm and issue a veto which will trigger the dynamic time lock. The most active, yet honest minority will notice an attempt for a shady change in the governance and start increasing the time lock by joining the veto.

This mechanism, therefore, will give users the ability to negotiate and induce the DAO to withdraw its proposal. Otherwise, the users will resort to foot voting and exit the protocol.

## FAQ

### Why do we need to introduce such a complex mechanism when the DAO or users or a mixed mechanism can elect a committee that will veto malicious proposals?

This approach worsens the situation by creating another instance of the Principal-Agent problem. The role of the agent is now taken by this newly-introduced committee which might not act in the best interest of users. Therefore, delegating the task of watching and filtering the protocol changes to the committee might not be a good idea. Additionally, this mechanism is quite slow and inefficient.

### Why can't we have a simple time lock on all governance decisions so that users are guaranteed the opportunity to exit within the period of the time lock?

Well, either this time lock has to be extremely long to account for any withdrawal queue or there has to be an oracle that will keep an eye on the withdrawal queue length. Either way, this approach will reduce the efficiency of governance. Propagations of protocol changes will be delayed, specifically those that aim to fix a critical vulnerability. Lastly, a simple time lock won't provide users with any negotiation power nor does it improve the principal-agent problem.

### Why not involve stETH holders in the governance?

The drawback of this approach is that users will be burdened with governance duties. This goes against the users' initial motivation to obtain stETH, which is mostly for the reason of collecting yield rather than the headache from the protocol governance. Additionally, allowing users to select node operators usually leads to centralizing the validator set.

### Why it's important to launch before EIP-7002

Although this explainer aims to call on all token holders to vote in favor of Dual Governance, it's critical to emphasize the importance of launching before EIP 7002. Currently, LDO holders can't force node operators to exit. Even in the event of a captured DAO, it's hard to coerce Ethereum-aligned operators to act against their will. However, EIP 7002 will drastically shift the balance of power here by allowing LDO holders to force operators out of the protocol. This is why Dual Governance ideally needs to go live before or shortly after the EIP 7002. Users must be provided with exit guarantees to protect against a malicious withdrawal vault upgrade or undesirable changes to the node operator set.
