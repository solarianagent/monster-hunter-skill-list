/**
 * @property {Set<string>} selectedSkills a set of selected skills
 */
class SelectedSkillService {
  selectedSkills;

  /**
   * Adds a skill to selected skills
   * @param {Set<string>} selectedSkills - Skill to add to selected skills
   */
  setSelectedSkills(selectedSkills) {
    this.selectedSkills = selectedSkills;
  }

  /**
   * @return {Set<string>} selectedSkills
   */
  getSkills() {
    return this.selectedSkills;
  }
}

export const selectedSkillsService = new SelectedSkillService();